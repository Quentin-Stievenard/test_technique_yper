import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import { useParams } from 'react-router';
import axios from 'axios';
import './RetailDetail.scss';
import retourIcon from '../../asset/icon/Retour.svg';
type RetailDetailType = {
  name: string;
  address: {
    street: string;
    city: string;
    zip: string;
  };
  delivery_hours: {
    day: number;
    hours: { start: string; end: string };
  }[];
};
export default function RetailDetail() {
  const { id } = useParams();
  const [retailDetail, setRetailDetail] = useState<RetailDetailType>();
  const weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  const config = {
    headers: {
      Authorization: 'Bearer 8eb12b6a57434385b24e9b07c4e5cef4',
      'X-Request-Timestamp': Date.now()
    }
  };

  const url = ` https://io.beta.yper.org/retailpoint/${id}`;

  const getRetailDetail = () => {
    axios
      .get(url, config)
      .then((response) => {
        setRetailDetail(response.data.result);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    return getRetailDetail();
  }, [id]);

  console.log(retailDetail);

  return (
    <>
      <Header />
      <main className="detail-container">
        {retailDetail ? (
          <div>
            <div className="company-information">
              <h4>{retailDetail?.name}</h4>
              <p>{retailDetail?.address?.street}</p>
              <p>
                {retailDetail?.address?.city} {retailDetail?.address?.zip}
              </p>
            </div>
            <h3>Horaires d&apos;ouverture :</h3>
            <div className="schedule-container">
              {retailDetail.delivery_hours.map((deliveryHour, i) => {
                const day = weekDays[deliveryHour.day - 1];
                const startDate = new Date(deliveryHour.hours.start);
                const startHour =
                  startDate.getUTCHours() +
                  'H' +
                  startDate.getUTCMinutes().toString().padStart(2, '0');

                const endDate = new Date(deliveryHour.hours.end);
                const endHour =
                  endDate.getUTCHours() + 'H' + endDate.getUTCMinutes().toString().padStart(2, '0');

                return (
                  <div className="schedule" key={i}>
                    <p>{day}</p>
                    <p className="hour-container">
                      {startHour && endHour ? (
                        <p>
                          {startHour} - {endHour}
                        </p>
                      ) : (
                        <p>Fermé</p>
                      )}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <p>Oups ! Nous n&apos;avons pas d&apos;information sur ce magasin</p>
        )}
        <hr />
        <a href="/">
          <img src={retourIcon} alt="Icone Retour" />
          <p>Retour au résultat</p>
        </a>
      </main>
    </>
  );
}
