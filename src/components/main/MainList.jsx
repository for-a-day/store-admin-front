import { Box, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import React from 'react';

const MainList = () => {
    return (
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh', // 전체 뷰포트 높이를 차지하도록 설정
        textAlign: 'center', // 텍스트를 가운데 정렬
      }}
    >
      <Typography variant="h1">
        환영합니다~~~ 
      </Typography>
      <Typography variant="h1">
        원하시는 메뉴를 하단 바에서 선택해주세용~
      </Typography>
    </Box>
    );
};

export default MainList;