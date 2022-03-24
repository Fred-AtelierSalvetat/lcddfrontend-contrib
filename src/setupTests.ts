import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import chai from 'chai';
import chaiExclude from 'chai-exclude';
import { configure as configureEnzyme } from 'enzyme';
import createChaiEnzyme from 'chai-enzyme';
import createChaiJestDiff from 'chai-jest-diff';
import dirtyChai from 'dirty-chai';
import chaiJestSnapshot from 'chai-jest-snapshot';
import sinonChai from 'sinon-chai';
import enzymeToJSON from 'enzyme-to-json/serializer';
import chaiSubset from 'chai-subset';
import '@testing-library/jest-dom';

chai.use(chaiExclude)
  .use(dirtyChai)
  .use(createChaiJestDiff())
  .use(chaiJestSnapshot)
  .use(createChaiEnzyme())
  .use(sinonChai)
  .use(chaiSubset);

expect.addSnapshotSerializer(enzymeToJSON);

configureEnzyme({ adapter: new Adapter() });

// Make sure chai and jasmine ".not" play nice together
const originalNot = Object.getOwnPropertyDescriptor(chai.Assertion.prototype, 'not').get;
Object.defineProperty(chai.Assertion.prototype, 'not', {
  get() {
    Object.assign(this, this.assignedNot);
    return originalNot.apply(this);
  },
  set(newNot) {
    this.assignedNot = newNot;
    return newNot;
  },
});
// Combine both jest and chai matchers on expect
const originalExpect = global.expect;

global.expect = (actual) => {
  const originalMatchers = originalExpect(actual);
  const chaiMatchers = chai.expect(actual);
  const combinedMatchers = Object.assign(chaiMatchers, originalMatchers);
  return combinedMatchers;
};
