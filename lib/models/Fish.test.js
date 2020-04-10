const Fish = require('./Fish');

describe('Fish Model', () => {
  it('all fields are required', () => {
    const fish = new Fish({ season: {} });
    const { errors } = fish.validateSync();

    expect(errors.season.message).toEqual('Validation failed: end: Path `end` is required., start: Path `start` is required.');
    expect(errors.name.message).toEqual('Path `name` is required.');
    expect(errors.location.message).toEqual('Path `location` is required.');
    expect(errors.time.message).toEqual('Path `time` is required.');
    expect(errors.price.message).toEqual('Path `price` is required.');
  });
});
