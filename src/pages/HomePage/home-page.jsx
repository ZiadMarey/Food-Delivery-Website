import Card from "./Components/HomePage_Card/hp-card.jsx";

import "./home-page.css";

function HomePage() {
  
  return (
    <div className="home-page">


      {/* add zipcode to display which area*/}
      <p className="restArea"> Restaurants in your area </p>
      <div className="card-pool">
        <>
          <Card
            restName="Bamboo Garden"
            restDescription="Chinese"
            openHours={8}
            closeHours={18}
          />
          <Card 
          restName="Mumbai Magic"
          restDescription="Indian"
          openHours={10}
          closeHours={20}/>
          <Card 
          restName="Sunflower"
          restDescription="Vegan"
          openHours={9}
          closeHours={21}/>
          <Card 
          restName="Sunrise Cafe"
          restDescription="Breakfast"
          openHours={7}
          closeHours={15}/>
          <Card 
          restName="Sakura Savor"
          restDescription="Japanese"
          openHours={9}
          closeHours={19}/>
          <Card 
          restName="Taco Fiesta"
          restDescription="Mexican"
          openHours={10}
          closeHours={20}/>
          <Card 
          restName="Sahara Sizzle"
          restDescription="Arabic"
          openHours={10}
          closeHours={22}/>
          <Card 
          restName="Kyoto Cuisine"
          restDescription="Asian"
          openHours={8}
          closeHours={22}/>
          <Card 
          restName="Caribbean Pulse"
          restDescription="Jamaican"
          openHours={8}
          closeHours={20}/>
          <Card 
          restName="Muffin Mania"
          restDescription="Breakfast"
          openHours={7}
          closeHours={15}/>
          <Card 
          restName="India Gate"
          restDescription="Indian"
          openHours={8}
          closeHours={19}/>
          <Card 
          restName="Wok and Roll"
          restDescription="Asian"
          openHours={9}
          closeHours={21}/>
        </>
      </div>
    </div>
  );
}
export default HomePage;
