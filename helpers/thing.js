/*
 *  helpers/thing.js
 *
 *  David Janes
 *  IOTDB.org
 *  2016-07-01
 *
 *  Copyright [2013-2016] [David P. Janes]
 *
 *  Things Manager. Handle finding new Things and
 *  tracking things that we already know about.
 *  This replaces massive amounts of code in 'IOTDB'
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

"use strict";

const _ = require("iotdb-helpers");

const _universal_thing_id = ( thing_id, model_id ) => {
    const iotdb = require('../iotdb');
    const runner_id = iotdb.keystore().get("/homestar/runner/keys/homestar/key", null);

    if (runner_id) {
        return _.id.uuid.iotdb("t", runner_id.replace(/^.*:/, '') + ":" + _.hash.short(thing_id + ":" + model_id));
    } else {
        return thing_id + ":" + model_id;
    }
};

const universal_thing_id = thing => {
    return _universal_thing_id(thing.thing_id(), thing.model_id());
};

const bind_thing_to_bridge = (thing, bridge, binding) => {
    const _reachable_changed = is_reachable => {
        thing.band("connection").set("iot:reachable", is_reachable);
    };

    const _update_from_mapping = pulld => {
        const mapping = bridge.binding.mapping;
        if (!mapping) {
            return pulld;
        }

        pulld = _.d.clone.shallow(pulld);

        _.pairs(pulld)
            .map(pkv => ({
                key: pkv[0],
                value: pkv[1],
                cvalue: _.ld.compact(pkv[1]),
                md: mapping[pkv[0]]
            }))
            .filter(d => d.md)
            .forEach(d => {
                _.pairs(d.md)
                    .filter(mkv => (mkv[1] === d.value) || (mkv[1] === d.cvalue))
                    .forEach(mkv => pulld[d.key] = mkey[0])
                });

        return pulld;
    }

    const _pull_istate = pulld => {
        pulld = _.timestamp.add(pulld);

        thing.band("istate").update(pulld, {
            add_timestamp: true,
            check_timestamp: true,
            validate: false,
        });
    };

    const _bridge_to_meta = pulld => {
        _reachable_changed(bridge.reachable() ? true : false);

        const metad = thing.state("meta");
        metad["iot:thing-id"] = universal_thing_id(thing); 

        thing.band("meta").update(metad, {
            add_timestamp: true,
            check_timestamp: false,
        });
    };

    const _on_ostate = ( _t, _b, state ) => {
        if (!bridge.__thing) {
            thing.removeListener("ostate", _on_ostate);
            return;
        }

        state = _.object(_.pairs(state)
            .filter(p => p[1] !== null)
            .filter(p => !p[0].match(/^@/)));
        if (_.is.Empty(state)) {
            return;
        }
        
        bridge.push(state, () => {
            thing.update("ostate", {});
        });
    };

    const _on_disconnect = () => {
        thing.removeListener("ostate", _on_ostate);
        thing.removeListener("disconnect", _on_disconnect);
        thing.reachable = () => false;

        if (thing.__bridge === thing) {
            thing.__bridge = null;
        }
        bridge.__thing = null;

        bridge.disconnect();
    }

    const _model_to_meta = () => {
        const iot_keys = [ "iot:facet", "iot:help", "iot:model-id" ];

        const metad = _.object(_.pairs(thing.state("model"))
            .filter(kv => iot_keys.indexOf(kv[0]) > -1 || kv[0].match(/^schema:/)))

        thing.band("meta").update(metad);
    }

    // --- main code
    bridge.__thing = thing;
    thing.__bridge = bridge;

    bridge.pulled = pulld => {
        if (pulld) {
            _pull_istate(pulld);
        } else {
            _reachable_changed(bridge.reachable() ? true : false);
        } 
    };

    thing.on("disconnect", _on_disconnect);
    thing.on("ostate", _on_ostate);


    _model_to_meta();
    _bridge_to_meta();

    bridge.connect(_.d.compose.shallow(binding.connectd, {}));
    bridge.pull();
};


const make_thing = bandd => {
    const iotdb_thing = require('iotdb-thing');

    bandd = _.d.clone.deep(bandd);
    bandd.model = bandd.model || {};
    bandd.meta = bandd.meta || {};
    bandd.istate = bandd.istate || {};
    bandd.ostate = bandd.ostate || {};
    bandd.connection = bandd.connection || {};

    return iotdb_thing.make(bandd);
};

/**
 *  API
 */
exports.thing = {
    bind_thing_to_bridge: bind_thing_to_bridge,
    universal_thing_id: universal_thing_id,
    make_thing: make_thing,
};
