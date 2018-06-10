import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(import('../src/pages'))

export default () =>
  <div>
    <DynamicComponent />
    <p>HOME PAGE is here!</p>
  </div>