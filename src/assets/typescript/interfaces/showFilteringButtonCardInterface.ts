export default interface ShowFilteringButtonCardInterface {
  filter: "region" | "price" | "area" | "bedrooms" | "";
  children: React.ReactNode;
}
