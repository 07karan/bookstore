import axios from 'axios';
import { FaCheckCircle } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const Message = styled.div`
  text-align: center;
`;
const Success = () => {
  //   const {id}=useParams();

  // const downloadPDF = async () => {
  //   try {
  //     const res = await axios.get(`https://bookstore-1gta.onrender.com/book/${id}`)
  //     const data=res.data;
  //     window.open(`${data.data.url}`, '_blank');
  //   } catch (error) {
  //     console.error('Error downloading PDF:', error);
  //   }
  // }

  return (
    <Container>
      <FaCheckCircle size={50} color="green" />
      <Message>
        <h1>Thank You for Your Purchase!</h1>
        <p>Your payment was successful. Your order will be processed shortly.</p>
        <a href="/books" className=' text-green-500 b'>Back to Home</a><br /><br />
        {/* <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200" onClick={downloadPDF}>
          Download Pdf
        </button> */}
      </Message>
    </Container>
  )
}

export default Success