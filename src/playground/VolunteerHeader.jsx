import styled from "styled-components";
import Volunteers from "../layouts/Headers/Volunteers";

const StyledVolunteerHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #f0f0f0;
    border-bottom: 1px solid #e0e0e0;
    box-shadow: 0 2px 2px #c8c8c8;
`
const VolunteerHeader = () => {
    return (
        <StyledVolunteerHeader>
            <Volunteers />
        </StyledVolunteerHeader>
    )
}

export default VolunteerHeader;