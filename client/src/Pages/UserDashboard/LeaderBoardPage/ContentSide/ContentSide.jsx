//;
import { Stack } from "@mui/system";
import LeaderBoardTable from "./LeaderBoardTable/LeaderBoardTable";
import SearchbarFilter from "./SearchBarFilter/SearchbarFilter";

const ContentSide = () => {
  return (
    <div>
      <Stack spacing={2}>
        <SearchbarFilter />
        <LeaderBoardTable />
      </Stack>
    </div>
  );
};

export default ContentSide;
