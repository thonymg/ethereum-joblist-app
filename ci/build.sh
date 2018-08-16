#!/usr/bin/env sh
set -x
set -e
ganache-cli -m "stumble brown army cart method holiday entry small gallery clinic excite true" > /dev/null &
GANACHE_PID=$!
trap "kill $GANACHE_PID" EXIT INT TERM

truffle compile
truffle migrate
truffle test

npm test
ng e2e
ng lint


#(0) 0xf3d91c75404bd97BD3711F61254960d4d857E89E
#(1) 0xee4f3d9599151B1976AF76bCcb747FC1EC81d6b3
#(2) 0x49124BecC5Ab97a2e3001c2e49518DAE97E10Fec
