'use strict'
const test = require('tape')
const c = require('../')

test('value merge', function (t) {
  t.plan(4)

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
  t.plan(1)

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
})

test('order', function (t) {
  t.plan(1)

  const wawa = c({
    one: 'one',
    '$something': {
      two: 'two'
    },
    three: 'three'
  }, {
    $something: true
  })

  t.same(
    JSON.stringify(
      wawa
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
