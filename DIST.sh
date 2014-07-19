#
#   DIST.sh
#
#   David Janes
#   IOTDB
#   2014-04-18
#
#   Distribute iotdb to NPM
#

DO_NPM_IOTDB_PACKAGE=true
DIST_ROOT=/var/tmp/node-iotdb.dist.$$
IOTDB_ROOT=$HOME/iotdb

if [ ! -d "$DIST_ROOT" ]
then
    mkdir "$DIST_ROOT"
fi

if $DO_NPM_IOTDB_PACKAGE
then
    echo "=================="
    echo "NPM Packge: iotdb"
    echo "=================="
    (
        NPM_IOTDB_SRC=../node-iotdb
        cd $NPM_IOTDB_SRC || exit 1

        NPM_IOTDB_DST=$DIST_ROOT/iotdb
        echo "NPM_IOTDB_DST=$NPM_IOTDB_DST"

        if [ -d ${NPM_IOTDB_DST} ]
        then
            rm -rf "${NPM_IOTDB_DST}"
        fi
        mkdir "${NPM_IOTDB_DST}" || exit 1

        tar cf - \
            --exclude "xx*" \
            --exclude "yy*" \
            README.md \
            LICENSE.txt \
            *.js *.json \
            libs/*js drivers/*js drivers/libs/*.js bin/data/* bin/iotdb-control |
        ( cd "${NPM_IOTDB_DST}" && tar xvf - )

        python -c "
import json

filename = 'package.json'
jd = json.load(open(filename))
versions = jd['version'].split('.')
versions[-1] = '%d' % ( int(versions[-1]) + 1, )
jd['version'] = '.'.join(versions)
json.dump(jd, open(filename, 'w'), sort_keys=True, indent=4)
print 'new package version:', jd['version']
" || exit 1

        ## cp dist/*.* "${NPM_IOTDB_DST}" || exit 1

        cd "${NPM_IOTDB_DST}" || exit 1
        npm publish

        echo "end"
    )
fi