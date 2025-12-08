import Companies from "../layouts/Headers/companies";
import styled from 'styled-components';

const StyledCompaniesHeader = styled.div`

`


const CompaniesHeader = () => {
    return (
      <StyledCompaniesHeader>
        <Companies />
      </StyledCompaniesHeader>
    );
}

export default CompaniesHeader;