import layout from "./layout";

export default () => {
  return layout(`
    <div>
      AWWW... You have found a missing page.
      <a rel="noopener noreferrer" href="/">Go back home.</a>
    </div>
  `);
};
