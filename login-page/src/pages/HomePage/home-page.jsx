import Card from "../../Componenets/HomePage_Card/hp-card.jsx";

import "./home-page.css";

function HomePage() {
  return (
    <div className="home-page">

      <p className="restArea"> Restaurants in your area</p>
      <div className="card-pool">
        <>
          <Card
            restName="Meat in a Box"
            restDescription="Non Vegan"
            openHours={8}
            closeHours={18}
          />
          <Card 
          restName="Kebab"
          restDescription="Kebab"
          openhours={10}
          closeHours={20}/>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </>
      </div>
    </div>
  );
}
export default HomePage;
