// // services/logout.config.js

// import API_BASE_URL from "./baseurl.config";
// import fetchAPI from "./fetch.config";

// const logoutService = async () => {
//     try {
//         // ================================
//         // [백엔드 구현 전 임시 로그아웃 처리]
//         // ================================
//         console.warn("[logoutService] Backend logout not implemented. Using temporary logout.");
//         return true;

//         // ================================
//         // [백엔드 구현 시 여기를 주석 해제]
//         // ================================
//         /*
//         const response = await fetchAPI(`${API_BASE_URL}/auth/logout`, {
//           method: "POST",
//         });
    
//         return response;
//         */
//     } catch (error) {
//         console.error("logoutService error:", error);
//         throw error;
//     }
// };

// export default logoutService;