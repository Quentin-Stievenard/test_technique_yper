import React, { useEffect, useState } from 'react';
import './App.scss';
import enseigneMagasin from './asset/image/enseigne_magasin.svg';
import pinIcon from './asset/icon/pin.svg';
import Header from './components/Header/Header';
import SearchInput from './components/SearchInput/SearchInput';
import axios from 'axios';

function App() {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const [retails, setRetails] = useState<any[]>([]);

  const config = {
    headers: {
      Authorization: 'Bearer 8eb12b6a57434385b24e9b07c4e5cef4',
      'X-Request-Timestamp': Date.now()
    }
  };

  const url = ` https://io.beta.yper.org/retailpoint/search?location=${lat},${lng}&max_distance=30000&limit=10`;

  const retailPointSearch = () => {
    axios
      .get(url, config)
      .then((response) => {
        setRetails(response.data.result);
        console.log(response.data.result);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    console.log(lat, lng);
  }, [lat, lng]);

  return (
    <>
      <Header />
      <main className="home">
        <div className="home-container">
          <div className="home-left">
            <h1>Trouvez les points de vente proches de chez vous !</h1>
            <p>
              Renseignez votre adresse dans le champ ci-dessous, et trouvez tous nos points de vente
              en quelques instants :
            </p>
            <SearchInput
              onClick={retailPointSearch}
              latProps={{ lat, setLat }}
              lngProps={{ lng, setLng }}
            />
          </div>
          <img src={enseigneMagasin} alt="Enseigne du magasin" />
        </div>
        <div className="home-result">
          {retails.length <= 0 ? (
            <div className="no-result">
              <img src={pinIcon} alt="Icone localisation" />
              <p>Lancez la recherche pour afficher les points de vente ici !</p>
            </div>
          ) : (
            <div className="list-result">
              <h4>Résultat de la recherche :</h4>
              {retails.map((retail) => {
                return (
                  <div key={retail._id}>
                    <hr />
                    <div className="list-container">
                      <p>{retail.name}</p>
                      <a href={`/retail/${retail._id}`}>Voir plus d&apos;info</a>
                    </div>
                  </div>
                );
              })}
              <hr />
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
