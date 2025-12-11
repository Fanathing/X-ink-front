import styled from 'styled-components';
import Layout from '../layouts/Layout';
import { useState } from 'react';
import axios from 'axios';

const StyledMyprofilePage = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 120px auto;
`;

const Myprofile = () => {
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    const fileInput = document.getElementById('upload');
    const file = fileInput.files[0];
    if (!file) return alert('파일을 선택하세요.');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/upload`,
        formData,
        {
          withCredentials: true,
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
        <input
          id="upload"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />

        {preview && <img src={preview} alt="preview" width="200" />}

        <button onClick={handleUpload}>업로드</button>
      </StyledMyprofilePage>
    </Layout>
  );
};

export default Myprofile;
