import useFetch from "../hook/useFetch";
import Card from "../components/Card";

const CardContainer = () => {
  const { data, loading } = useFetch(
    "https://63bedcf7f5cfc0949b634fc8.mockapi.io/users"
  );

  if (loading) return <p role="status">Loading...</p>;

  return (
    <div className="container">
      <Card item={data} />
    </div>
  );
};

export default CardContainer;
