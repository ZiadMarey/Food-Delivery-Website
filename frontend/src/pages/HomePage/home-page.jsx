<<<<<<< HEAD
import Card from "./Components/HomePage_Card/hp-card.jsx";
=======
import Card from "../../Componenets/HomePage_Card/hp-card.jsx";
>>>>>>> 802fafa46075c57c80248b1ed9b905e230ac6906

import "./home-page.css";

function HomePage() {
<<<<<<< HEAD
  
=======
>>>>>>> 802fafa46075c57c80248b1ed9b905e230ac6906
  return (
    <div className="home-page">


      {/* add zipcode to display which area*/}
      <p className="restArea"> Restaurants in your area </p>
      <div className="card-pool">
        <>
          <Card
<<<<<<< HEAD
            restName="Bamboo Garden"
            restDescription="Chinese"
=======
            restName="Meat in a Box"
            restDescription="Non Vegan"
>>>>>>> 802fafa46075c57c80248b1ed9b905e230ac6906
            openHours={8}
            closeHours={18}
          />
          <Card 
<<<<<<< HEAD
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
=======
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
>>>>>>> 802fafa46075c57c80248b1ed9b905e230ac6906
        </>
      </div>
    </div>
  );
}
export default HomePage;
