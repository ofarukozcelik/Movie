import { toast } from 'react-toastify';
import InputField from '../components/InputField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
  const navigate = useNavigate();

  // Formun gönderilmesi
  const handleSubmit = (e) => {
    // Sayfa yenilemeyi engelle
    e.preventDefault();

    // İnputlardaki verilerden bir obje oluşturma
    const form = new FormData(e.target);

    const data = Object.fromEntries(form.entries());

    // Veriyi api'a gönder
    axios
      .post('http://127.0.0.1:5001/api/movies', data)
      .then(() => {
        // Bildirim ver
        toast.success('Film başarıyla oluşturuldu');

        // Anasayfaya yönlendir
        navigate('/');
      })
      .catch(() => {
        // Bildirim ver
        toast.error('Film oluşturma başarısız');
      });
  };

  return (
    <div className="grid place-items-center bg-teal-700 h-[calc(100vh-81px)]">
      <div className="max-w-[1000px] grid grid-cols-1 sm:grid-cols-2  gap-10 bg-white rounded p-10 shadow-lg">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 "
        >
          <h1 className="text-4xl font-bold mb-10">
            Yeni Film Oluştur
          </h1>

          <InputField label="Başlık" type="text" name="title" />
          <InputField label="Kategori" type="text" name="genre" />
          <InputField label="Puan" type="number" name="rating" />
          <InputField label="Yıl" type="number" name="year" />

          <button className="bg-teal-600 p-1 rounded-md text-white font-semibold hover:bg-teal-500">
            Oluştur
          </button>
        </form>

        <div className="flex items-center justify-center">
          <img
            className="max-h-[300px]"
            src="movie-add.png"
          />
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
