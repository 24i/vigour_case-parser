'use strict'
const test = require('tape')
const c = require('../')

test('value merge', function (t) {
  t.plan(8)

  t.same(
    c({
      val: 'originalVal',
      otherField: true,
      otherNested: {
        nested: true,
        reallyNeste: {
          really: true
        }
      }
    }, {
      $includeA: true
    }),
    {
      val: 'originalVal',
      otherField: true,
      otherNested: {
        nested: true,
        reallyNeste: {
          really: true
        }
      }
    },
    'without cases'
  )

  t.same(
    c({
      val: 'originalVal',
      $includeA: 'includeA',
      otherField: true
    }, {
      $includeA: true
    }),
    {
      val: 'includeA',
      otherField: true
    },
    'parse object with props'
  )

  t.same(
    c({
      nullField: null
    }, {
      $includeA: true
    }),
    {
      nullField: null
    },
    'don\'t trow away nulls'
  )

  t.same(
    c({
      one: {
        val: 'originalVal',
        $includeA: 'includeA',
        otherField: true
      }
    }, {
      $includeA: true
    }),
    {
      one: {
        val: 'includeA',
        otherField: true
      }
    },
    'deep parse object with props'
  )

  t.same(
    c({
      val: 'originalVal',
      $includeA: 'includeA',
      $excludeA: '$excludeA'
    }, {
      $excludeA: false,
      $includeA: true
    }),
    'includeA',
    'parse object with val'
  )

  t.same(
    c({
      val: 'originalVal',
      $includeA: 'includeA',
      includeB: 'includeB'
    }, {
      includeB: true,
      $includeA: true
    }),
    'includeB',
    'parse object with val, multiple cases'
  )

  t.same(
    JSON.stringify(c({
      $: [ 'one', 'two', 'three' ]
    }, {})),
    JSON.stringify({
      $: [ 'one', 'two', 'three' ]
    }),
    'handle arrays'
  )

  t.same(
    JSON.stringify(c({
      inject: [
        { one: 'one' },
        { two: 'two' },
        { three: 'three' }
      ]
    }, {})),
    JSON.stringify({
      inject: [
        { one: 'one' },
        { two: 'two' },
        { three: 'three' }
      ]
    }),
    'objects inside arrays'
  )
})

test('object merge', function (t) {
  t.plan(1)

  t.same(
    c({
      val: 'originalVal',
      $includeA: {
        val: 'includeA',
        includeFieldA: true
      },
      otherField: true
    }, {
      $includeA: true
    }),
    {
      val: 'includeA',
      otherField: true,
      includeFieldA: true
    },
    'parse object nested fields'
  )
})

test('deletions', function (t) {
  t.plan(2)

  t.same(
    c({
      val: 'originalVal',
      otherField: true,
      $includeA: {
        otherField: null
      }
    }, {
      $includeA: true
    }),
    'originalVal',
    'delete property using case'
  )

  t.same(
    c({
      val: 'originalVal',
      $includeA: null
    }, {
      $includeA: true
    }),
    null,
    'top level deletion'
  )
})

test('! (negative) notation', function (t) {
  t.plan(2)

  t.same(
    c({
      val: 'originalVal',
      '!$something': 'notSomething'
    }, {
      $something: false
    }),
    'notSomething',
    'parse object with ! notation'
  )

  t.same(
    c({
      outsideValue: 'outsideValue',
      '!$something': {
        somethingA: true,
        somethingB: {
          somethingC: false
        }
      },
      outSideNested: {
        nested: true
      }
    }, {
      $something: false
    }),
    {
      outsideValue: 'outsideValue',
      somethingA: true,
      somethingB: {
        somethingC: false
      },
      outSideNested: {
        nested: true
      }
    },
    'complex object with ! notation'
  )
})

test('order', function (t) {
  t.plan(1)

  t.same(
    JSON.stringify(
      c({
        one: 'one',
        '$something': {
          two: 'two'
        },
        three: 'three'
      }, { $something: true })
    ),
    JSON.stringify(
      {
        one: 'one',
        two: 'two',
        three: 'three'
      }
    ),
    'order should not change'
  )
})
