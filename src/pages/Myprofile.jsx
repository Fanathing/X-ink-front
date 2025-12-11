import styled from 'styled-components';
import Layout from '../layouts/Layout';
import axios from 'axios';
import { useRef } from 'react';

const StyledMyprofilePage = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 120px auto;
`;

const Myprofile = () => {
  const fileRef = useRef(null);
  const handleUpload = async () => {
    const file = fileRef.current?.files[0];
    if (!file) return alert('파일을 선택하세요.');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/upload`,
        formData,
        {
          withCredentials: true, // 업로드할때 쿠키 검사하는 로직있음
        },
      );
      alert(data.message);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <Layout>
      <StyledMyprofilePage>
        <input ref={fileRef} type="file" accept="image/*" />
        <button onClick={handleUpload}>업로드</button>
      </StyledMyprofilePage>
    </Layout>
  );
};

export default Myprofile;
