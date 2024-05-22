import { List, styled } from "@mui/material";

export const MyList =styled(List)(({type})=>({
display : type === 'row' ? 'flex' : 'block' ,

justifyContent :'center',
alignItems :'center'


}))