export const images: string[] = Object.values(
  import.meta.glob("./assets/images/*", {
    eager: true,
    import: "default",
  })
);
export const descriptions = Object.keys(
  import.meta.glob("./assets/images/*", {
    eager: true,
    import: "default",
  })
).map((path) => path.replace(/.\/assets\/images\/(.+)\.[a-z]{3,4}$/g, "$1"));
