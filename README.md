<!-- VDOC.badges travis; standard; npm; coveralls -->
<!-- DON'T EDIT THIS SECTION (including comments), INSTEAD RE-RUN `vdoc` TO UPDATE -->
[![Build Status](https://travis-ci.org/vigour-io/case-parser.svg?branch=master)](https://travis-ci.org/vigour-io/case-parser)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![npm version](https://badge.fury.io/js/case-parser.svg)](https://badge.fury.io/js/case-parser)
[![Coverage Status](https://coveralls.io/repos/github/vigour-io/case-parser/badge.svg?branch=master)](https://coveralls.io/github/vigour-io/case-parser?branch=master)

<!-- VDOC END -->
<!-- VDOC END -->
Parses your object, modifying it for defined cases that apply.
<!-- VDOC.jsdoc cases -->
<!-- DON'T EDIT THIS SECTION (including comments), INSTEAD RE-RUN `vdoc` TO UPDATE -->
#### var updated = case-parser(obj, cases, filter)

Takes an object and merges enabled cases and removes disabled cases in the object
- **obj** (*object*) - original object
- **cases** (*object*) - cases object
- **filter** (*function*) - (optional) filter properties to ignore
- **returns** (*object*) updated - obj

<!-- VDOC END -->