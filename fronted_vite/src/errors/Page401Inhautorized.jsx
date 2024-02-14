import { Link } from "react-router-dom";


export default function Page401() {
  document.title = 'Unauthorized';
  return (

    <div className="full-screen-image">
      <img src='../public/fondo_pantalla.avif' alt="Fondo" />
      <h2 style={{ position: 'absolute', top: '90px', left: '50%', transform: 'translate(-50%, -50%)', color: 'black', fontFamily: 'Courier New' }}>
        401 UNAUTHORIZED
      </h2>
      <Link to ='/'>
        <h4 style={{ position: 'absolute', top: '120px', left: '50%', transform: 'translate(-50%, -50%)', color: 'black', fontFamily: 'Courier New' }}>
          BACK
        </h4>
      </Link>


    </div>
  )


}