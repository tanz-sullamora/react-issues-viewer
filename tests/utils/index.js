import { readableDate } from './../../app/utils';

describe('Utils', function() {

  it('readableDate must return readable date', function() {
    const dateString = '2016-09-15T09:25:43Z';
    const expected = 'Thu, September 15, 2016, 12:25 PM'

    const actual = readableDate(dateString);

    expect(actual).toEqual(expected);
  });

});
