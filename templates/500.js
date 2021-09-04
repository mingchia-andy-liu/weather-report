import layout from "./layout";

export default () => {
  return layout(`
    <div>
      uh-oh! Something went wrong. 😭 Please try again later.
      <a rel="noopener noreferrer" href="/">Go back home.</a>
    </div>
  `);
};
