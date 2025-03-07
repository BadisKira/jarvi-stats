import { gql } from "@apollo/client";
export const getHisotyEntriesTypes = gql`
query getHisotyEntriesTypes {
  historyentries_types {
    value
  }
}

`;