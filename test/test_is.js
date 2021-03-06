/*
 *  test_is.js
 *
 *  David Janes
 *  IOTDB
 *  2015-04-15
 */

"use strict";

var assert = require("assert")
var _ = require("../helpers")

var thing_set = require("../thing_set");
var bridge = require("../bridge");

/* --- tests --- */
describe('test_is', function() {
    var testThing = { _isThing: true, on: () => {} }
    var testThingSet0 = thing_set.make();
    var testThingSet1 = thing_set.make();
    testThingSet1.add(testThing);

    var testBridge = new bridge.Bridge();
    var testTransport = function() {};
    testTransport._isTransport = true;

    it('is.Thing', function() {
        assert.ok(_.is.Thing(testThing));
        assert.ok(!_.is.Thing(testThingSet0));
        assert.ok(!_.is.Thing(testThingSet1));
        assert.ok(!_.is.Thing(testTransport));
        assert.ok(!_.is.Thing(testBridge));

        assert.ok(!_.is.Thing(null));
        assert.ok(!_.is.Thing(undefined));
        assert.ok(!_.is.Thing(0));
        assert.ok(!_.is.Thing(1));
        assert.ok(!_.is.Thing(""));
        assert.ok(!_.is.Thing("string"));
        assert.ok(!_.is.Thing([ "a", ]));
        assert.ok(!_.is.Thing({ "a": "n" }));
    });
    it('is.ThingSet', function() {
        assert.ok(!_.is.ThingSet(testThing));
        assert.ok(_.is.ThingSet(testThingSet0));
        assert.ok(_.is.ThingSet(testThingSet1));
        assert.ok(_.is.ThingArray(testThingSet0));
        assert.ok(_.is.ThingArray(testThingSet1));
        assert.ok(!_.is.ThingSet(testTransport));
        assert.ok(!_.is.ThingSet(testBridge));

        assert.ok(!_.is.ThingSet(null));
        assert.ok(!_.is.ThingSet(undefined));
        assert.ok(!_.is.ThingSet(0));
        assert.ok(!_.is.ThingSet(1));
        assert.ok(!_.is.ThingSet(""));
        assert.ok(!_.is.ThingSet("string"));
        assert.ok(!_.is.ThingSet([ "a", ]));
        assert.ok(!_.is.ThingSet({ "a": "n" }));
    });
    it('is.Transport', function() {
        assert.ok(!_.is.Transport(testThing));
        assert.ok(!_.is.Transport(testThingSet0));
        assert.ok(!_.is.Transport(testThingSet1));
        assert.ok(_.is.Transport(testTransport));
        assert.ok(_.is.Transporter(testTransport));
        assert.ok(!_.is.Transport(testBridge));

        assert.ok(!_.is.Transport(null));
        assert.ok(!_.is.Transport(undefined));
        assert.ok(!_.is.Transport(0));
        assert.ok(!_.is.Transport(1));
        assert.ok(!_.is.Transport(""));
        assert.ok(!_.is.Transport("string"));
        assert.ok(!_.is.Transport([ "a", ]));
        assert.ok(!_.is.Transport({ "a": "n" }));
    });
    it('is.Bridge', function() {
        assert.ok(!_.is.Bridge(testThing));
        assert.ok(!_.is.Bridge(testThingSet0));
        assert.ok(!_.is.Bridge(testThingSet1));
        assert.ok(!_.is.Bridge(testTransport));
        assert.ok(_.is.Bridge(testBridge));

        assert.ok(!_.is.Bridge(null));
        assert.ok(!_.is.Bridge(undefined));
        assert.ok(!_.is.Bridge(0));
        assert.ok(!_.is.Bridge(1));
        assert.ok(!_.is.Bridge(""));
        assert.ok(!_.is.Bridge("string"));
        assert.ok(!_.is.Bridge([ "a", ]));
        assert.ok(!_.is.Bridge({ "a": "n" }));
    });
    it('is.Dictionary', function() {
        // assert.ok(!_.is.Dictionary(testThing));
        // assert.ok(!_.is.Dictionary(testThingSet0));
        // assert.ok(!_.is.Dictionary(testThingSet1));
        assert.ok(!_.is.Dictionary(testTransport));
        assert.ok(!_.is.Dictionary(testBridge));

        assert.ok(!_.is.Dictionary(null));
        assert.ok(!_.is.Dictionary(undefined));
        assert.ok(!_.is.Dictionary(0));
        assert.ok(!_.is.Dictionary(1));
        assert.ok(!_.is.Dictionary(""));
        assert.ok(!_.is.Dictionary("string"));
        assert.ok(!_.is.Dictionary([ "a", ]));
        assert.ok(_.is.Dictionary({ "a": "n" }));
    });
    it('is.Object', function() {
        assert.ok(_.is.Object(testThing));
        assert.ok(_.is.Object(testThingSet0));
        assert.ok(_.is.Object(testThingSet1));
        assert.ok(_.is.Object(testTransport));
        assert.ok(_.is.Object(testBridge));

        assert.ok(!_.is.Object(null));
        assert.ok(!_.is.Object(undefined));
        assert.ok(!_.is.Object(0));
        assert.ok(!_.is.Object(1));
        assert.ok(!_.is.Object(""));
        assert.ok(!_.is.Object("string"));
        assert.ok(_.is.Object([ "a", ]));
        assert.ok(_.is.Object({ "a": "n" }));
        assert.ok(_.is.Object(function() {}));
    });
    it('is.Null', function() {
        assert.ok(!_.is.Null(testThing));
        assert.ok(!_.is.Null(testThingSet0));
        assert.ok(!_.is.Null(testThingSet1));
        assert.ok(!_.is.Null(testTransport));
        assert.ok(!_.is.Null(testBridge));

        assert.ok(_.is.Null(null));
        assert.ok(!_.is.Null(undefined));
        assert.ok(!_.is.Null(0));
        assert.ok(!_.is.Null(1));
        assert.ok(!_.is.Null(""));
        assert.ok(!_.is.Null("string"));
        assert.ok(!_.is.Null([ "a", ]));
        assert.ok(!_.is.Null({ "a": "n" }));
        assert.ok(!_.is.Null(function() {}));
    });
    it('is.Undefined', function() {
        assert.ok(!_.is.Undefined(testThing));
        assert.ok(!_.is.Undefined(testThingSet0));
        assert.ok(!_.is.Undefined(testThingSet1));
        assert.ok(!_.is.Undefined(testTransport));
        assert.ok(!_.is.Undefined(testBridge));

        assert.ok(!_.is.Undefined(null));
        assert.ok(_.is.Undefined(undefined));
        assert.ok(!_.is.Undefined(0));
        assert.ok(!_.is.Undefined(1));
        assert.ok(!_.is.Undefined(""));
        assert.ok(!_.is.Undefined("string"));
        assert.ok(!_.is.Undefined([ "a", ]));
        assert.ok(!_.is.Undefined({ "a": "n" }));
        assert.ok(!_.is.Undefined(function() {}));
    });
    it('is.Boolean', function() {
        assert.ok(!_.is.Boolean(testThing));
        assert.ok(!_.is.Boolean(testThingSet0));
        assert.ok(!_.is.Boolean(testThingSet1));
        assert.ok(!_.is.Boolean(testTransport));
        assert.ok(!_.is.Boolean(testBridge));

        assert.ok(!_.is.Boolean(null));
        assert.ok(!_.is.Boolean(undefined));
        assert.ok(!_.is.Boolean(0));
        assert.ok(!_.is.Boolean(1));
        assert.ok(_.is.Boolean(false));
        assert.ok(_.is.Boolean(true));
        assert.ok(!_.is.Boolean(""));
        assert.ok(!_.is.Boolean("string"));
        assert.ok(!_.is.Boolean([ "a", ]));
        assert.ok(!_.is.Boolean({ "a": "n" }));
        assert.ok(!_.is.Boolean(function() {}));
    });
    it('is.Number', function() {
        assert.ok(!_.is.Number(testThing));
        assert.ok(!_.is.Number(testThingSet0));
        assert.ok(!_.is.Number(testThingSet1));
        assert.ok(!_.is.Number(testTransport));
        assert.ok(!_.is.Number(testBridge));

        assert.ok(!_.is.Number(null));
        assert.ok(!_.is.Number(undefined));
        assert.ok(_.is.Number(0));
        assert.ok(_.is.Number(1));
        assert.ok(_.is.Number(0.1));
        assert.ok(_.is.Number(1.2));
        assert.ok(!_.is.Number(false));
        assert.ok(!_.is.Number(true));
        assert.ok(!_.is.Number(""));
        assert.ok(!_.is.Number("string"));
        assert.ok(!_.is.Number([ "a", ]));
        assert.ok(!_.is.Number({ "a": "n" }));
        assert.ok(!_.is.Number(function() {}));
    });
    it('is.Integer', function() {
        assert.ok(!_.is.Integer(testThing));
        assert.ok(!_.is.Integer(testThingSet0));
        assert.ok(!_.is.Integer(testThingSet1));
        assert.ok(!_.is.Integer(testTransport));
        assert.ok(!_.is.Integer(testBridge));

        assert.ok(!_.is.Integer(NaN));
        assert.ok(!_.is.Integer(new Date()));
        assert.ok(!_.is.Integer(/^hello world$/));
        assert.ok(!_.is.Integer(null));
        assert.ok(!_.is.Integer(undefined));
        assert.ok(_.is.Integer(0));
        assert.ok(_.is.Integer(1));
        assert.ok(!_.is.Integer(0.1));
        assert.ok(!_.is.Integer(1.2));
        assert.ok(!_.is.Integer(false));
        assert.ok(!_.is.Integer(true));
        assert.ok(!_.is.Integer(""));
        assert.ok(!_.is.Integer("string"));
        assert.ok(!_.is.Integer([ "a", ]));
        assert.ok(!_.is.Integer({ "a": "n" }));
        assert.ok(!_.is.Integer(function() {}));
    });
    it('is.Date', function() {
        assert.ok(!_.is.Date(testThing));
        assert.ok(!_.is.Date(testThingSet0));
        assert.ok(!_.is.Date(testThingSet1));
        assert.ok(!_.is.Date(testTransport));
        assert.ok(!_.is.Date(testBridge));

        assert.ok(!_.is.Date(NaN));
        assert.ok(_.is.Date(new Date()));
        assert.ok(!_.is.Date(/^hello world$/));
        assert.ok(!_.is.Date(null));
        assert.ok(!_.is.Date(undefined));
        assert.ok(!_.is.Date(0));
        assert.ok(!_.is.Date(1));
        assert.ok(!_.is.Date(0.1));
        assert.ok(!_.is.Date(1.2));
        assert.ok(!_.is.Date(false));
        assert.ok(!_.is.Date(true));
        assert.ok(!_.is.Date(""));
        assert.ok(!_.is.Date("string"));
        assert.ok(!_.is.Date([ "a", ]));
        assert.ok(!_.is.Date({ "a": "n" }));
        assert.ok(!_.is.Date(function() {}));
    });
    it('is.RegExp', function() {
        assert.ok(!_.is.RegExp(testThing));
        assert.ok(!_.is.RegExp(testThingSet0));
        assert.ok(!_.is.RegExp(testThingSet1));
        assert.ok(!_.is.RegExp(testTransport));
        assert.ok(!_.is.RegExp(testBridge));

        assert.ok(!_.is.RegExp(NaN));
        assert.ok(!_.is.RegExp(new Date()));
        assert.ok(_.is.RegExp(/^hello world$/));
        assert.ok(!_.is.RegExp(null));
        assert.ok(!_.is.RegExp(undefined));
        assert.ok(!_.is.RegExp(0));
        assert.ok(!_.is.RegExp(1));
        assert.ok(!_.is.RegExp(0.1));
        assert.ok(!_.is.RegExp(1.2));
        assert.ok(!_.is.RegExp(false));
        assert.ok(!_.is.RegExp(true));
        assert.ok(!_.is.RegExp(""));
        assert.ok(!_.is.RegExp("string"));
        assert.ok(!_.is.RegExp([ "a", ]));
        assert.ok(!_.is.RegExp({ "a": "n" }));
        assert.ok(!_.is.RegExp(function() {}));
    });
    it('is.NaN', function() {
        assert.ok(!_.is.NaN(testThing));
        assert.ok(!_.is.NaN(testThingSet0));
        assert.ok(!_.is.NaN(testThingSet1));
        assert.ok(!_.is.NaN(testTransport));
        assert.ok(!_.is.NaN(testBridge));

        assert.ok(_.is.NaN(NaN));
        assert.ok(!_.is.NaN(new Date()));
        assert.ok(!_.is.NaN(/^hello world$/));
        assert.ok(!_.is.NaN(null));
        assert.ok(!_.is.NaN(undefined));
        assert.ok(!_.is.NaN(0));
        assert.ok(!_.is.NaN(1));
        assert.ok(!_.is.NaN(0.1));
        assert.ok(!_.is.NaN(1.2));
        assert.ok(!_.is.NaN(false));
        assert.ok(!_.is.NaN(true));
        assert.ok(!_.is.NaN(""));
        assert.ok(!_.is.NaN("string"));
        assert.ok(!_.is.NaN([ "a", ]));
        assert.ok(!_.is.NaN({ "a": "n" }));
        assert.ok(!_.is.NaN(function() {}));
    });
    it('is.AbsoluteURL', function() {
        assert.ok(!_.is.AbsoluteURL(testThing));
        assert.ok(!_.is.AbsoluteURL(testThingSet0));
        assert.ok(!_.is.AbsoluteURL(testThingSet1));
        assert.ok(!_.is.AbsoluteURL(testTransport));
        assert.ok(!_.is.AbsoluteURL(testBridge));

        assert.ok(!_.is.AbsoluteURL(NaN));
        assert.ok(!_.is.AbsoluteURL(new Date()));
        assert.ok(!_.is.AbsoluteURL(/^hello world$/));
        assert.ok(!_.is.AbsoluteURL(null));
        assert.ok(!_.is.AbsoluteURL(undefined));
        assert.ok(!_.is.AbsoluteURL(0));
        assert.ok(!_.is.AbsoluteURL(1));
        assert.ok(!_.is.AbsoluteURL(0.1));
        assert.ok(!_.is.AbsoluteURL(1.2));
        assert.ok(!_.is.AbsoluteURL(false));
        assert.ok(!_.is.AbsoluteURL(true));
        assert.ok(!_.is.AbsoluteURL(""));
        assert.ok(!_.is.AbsoluteURL("string"));
        assert.ok(!_.is.AbsoluteURL([ "a", ]));
        assert.ok(!_.is.AbsoluteURL({ "a": "n" }));
        assert.ok(!_.is.AbsoluteURL(function() {}));

        assert.ok(_.is.AbsoluteURL("ftp://example.com"));
        assert.ok(_.is.AbsoluteURL("ftp://example.com/sub#1"));
        assert.ok(_.is.AbsoluteURL("http://example.com"));
        assert.ok(_.is.AbsoluteURL("http://example.com/sub#1"));
        assert.ok(_.is.AbsoluteURL("https://example.com"));
        assert.ok(_.is.AbsoluteURL("https://example.com/sub#1"));
        assert.ok(!_.is.AbsoluteURL("example.com/hi"));
        assert.ok(_.is.AbsoluteURL("iot:xxx")); // don't love it
    });
    it('is.FindKey', function() {
        // assert.ok(!_.is.FindKey(testThing));
        // assert.ok(!_.is.FindKey(testThingSet0));
        // assert.ok(!_.is.FindKey(testThingSet1));
        assert.ok(!_.is.FindKey(testTransport));
        assert.ok(!_.is.FindKey(testBridge));

        assert.ok(!_.is.FindKey(NaN));
        assert.ok(!_.is.FindKey(new Date()));
        assert.ok(!_.is.FindKey(/^hello world$/));
        assert.ok(!_.is.FindKey(null));
        assert.ok(!_.is.FindKey(undefined));
        assert.ok(!_.is.FindKey(0));
        assert.ok(!_.is.FindKey(1));
        assert.ok(!_.is.FindKey(0.1));
        assert.ok(!_.is.FindKey(1.2));
        assert.ok(!_.is.FindKey(false));
        assert.ok(!_.is.FindKey(true));
        assert.ok(_.is.FindKey(""));
        assert.ok(_.is.FindKey("string"));
        assert.ok(!_.is.FindKey([ "a", ]));
        assert.ok(_.is.FindKey({ "a": "n" }));
        assert.ok(!_.is.FindKey(function() {}));

        assert.ok(_.is.FindKey("ftp://example.com"));
        assert.ok(_.is.FindKey("ftp://example.com/sub#1"));
        assert.ok(_.is.FindKey("http://example.com"));
        assert.ok(_.is.FindKey("http://example.com/sub#1"));
        assert.ok(_.is.FindKey("https://example.com"));
        assert.ok(_.is.FindKey("https://example.com/sub#1"));
        assert.ok(_.is.FindKey("example.com/hi"));
        assert.ok(_.is.FindKey("iot:xxx"));
    });
})
