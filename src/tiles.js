export const mapper = ({ img, qty, retro }) => ({
  background: `url('${img}')`,
  qty,
  retro: retro ? `url('${retro}')` : null,
});

export default () => [];
