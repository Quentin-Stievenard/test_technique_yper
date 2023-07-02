import './SearchInput.scss';
import { usePlacesWidget } from 'react-google-autocomplete';
interface IlatProps {
  lat: number;
  setLat: (arg0: number) => void;
}
interface IlngProps {
  lng: number;
  setLng: (arg0: number) => void;
}
interface ISearchInput {
  latProps: IlatProps;
  lngProps: IlngProps;
  onClick: () => void;
}
export default function SearchInput({ latProps, lngProps, onClick }: ISearchInput) {
  const { setLat } = latProps;
  const { setLng } = lngProps;
  const { ref: inputRef } = usePlacesWidget<HTMLInputElement>({
    options: {
      types: ['address']
    },
    apiKey: 'AIzaSyCNemhlRhzcu8bF9WzTZOZtyPdWWPL5O-k',
    onPlaceSelected: (place) => {
      setLat(place.geometry.location.lat());
      setLng(place.geometry.location.lng);
    }
  });

  return (
    <div className="search-container">
      <input ref={inputRef} className="search-input" placeholder="Votre adresse" />
      <button onClick={onClick} className="search-button">
        Rechercher
      </button>
    </div>
  );
}
