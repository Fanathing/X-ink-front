import styled from 'styled-components';
import axios from 'axios';
import { useRef, useState } from 'react';

const StyledUpload = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  .hidden-input {
    display: none;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
  }

  .select-btn {
    width: 80px;
    height: 41px;
    background-color: #e5e7f0;
    color: #000000;
    font-size: 16px;
    font-weight: 600;
    border-radius: 6px;
    border: 0px solid;
    cursor: pointer;
    text-align: center;
    align-content: center;
  }

  .upload-btn {
    width: 80px;
    height: 41px;
    font-size: 16px;
    border: 0px solid;
    background-color: #2c6aa9;
    color: white;
    font-weight: 600;
    border-radius: 6px;
    cursor: pointer;
    text-align: center;
    align-content: center;
  }

  .thumnail {
    width: 296px;
    height: 296px;
    border-radius: 50%;
    object-fit: cover;
    overflow: hidden;
    border: 2px solid #e5e7f0;
  }
`;

const Upload = ({ user }) => {
  const [LOGO, setLOGO] = useState(user.LOGO_URL);
  console.log(user, '테스트2');

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
          withCredentials: true, // 업로드할때 쿠키 검사하는 로직있음..
        },
      );
      alert(data.message);
      window.location.reload();
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <StyledUpload className="left">
      <img
        className="thumnail"
        src={LOGO && LOGO}
        alt="이미지가 없습니다 ㅜㅜ"
      />
      <input
        id="profile-upload"
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden-input"
        onChange={(e) => {
          const files = e.target.files;
          if (files.length > 0) {
            const file = files[0];

            // 미리보기 URL로 변경
            const previewUrl = URL.createObjectURL(file);

            setLOGO(previewUrl);
          }
        }}
      />
      <div className="buttons">
        <label htmlFor="profile-upload" className="select-btn">
          파일 선택
        </label>

        <button onClick={handleUpload} className="upload-btn">
          업로드
        </button>
      </div>
    </StyledUpload>
  );
};

export default Upload;
