import * as React from 'react';
import { useEffect, useState } from 'react';
import { observer } from "mobx-react-lite"
import Card from '@mui/material/Card';
import { Grid } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLawyersStore } from '../../../../context/LawyersContext';
import { BarLoader } from "react-spinners";

export const ConsultationAvocatCards = observer(() => {
  const lawyersStore = useLawyersStore();
  const [consultationAvocat, setConsultationAvocat] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    if (lawyersStore.consultationAvocat.length > 0) {
      setConsultationAvocat(lawyersStore.consultationAvocat)
      setTotalPages(Math.ceil((lawyersStore.consultationAvocat.length - 1) / itemsPerPage))
    }
  }, [lawyersStore.consultationAvocat, currentPage])

  function geConsultationAvocatCards() {
    if (lawyersStore.loadingConsultationAvocat) {
      return (
        <Grid display='flex' height='10vh' marginLeft='45%' marginTop='2vh'>
          <BarLoader color="#e2e612" />
        </Grid>
      )
    }
    if (consultationAvocat) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const actualLawyers = consultationAvocat.slice(0, -1)
      const currentItems = actualLawyers.filter((_, i) => i >= startIndex && i < endIndex);
      return currentItems.map((lawyer, index ) => (
        <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Card key={index} sx={{ maxWidth: 300, margin: "1vh"}} onClick={() => window.open(`${lawyer[3]}`, '_blank')}>
            {/* <CardMedia
              sx={{ height: 200 }}
              image={`${lawyer[4]}`}
              title="Profile picture"
            /> */}
            <CardContent sx={{ height: 125 }}>
            <Typography variant="body2" color="text.secondary">
                {lawyer[0]}
                {lawyer[1]}
                {lawyer[2]}
                {lawyer[3]}
                {lawyer[4]}
                {lawyer[5]}
                {lawyer[6]}
              </Typography>
              {/* <Typography variant="h5" component="div">
                {lawyer[1]}
              </Typography>
              <Typography gutterBottom variant="h6" sx={{ color: 'blue' }}>
                {lawyer[2].replace(/&nbsp;/g, "")}
              </Typography> */}
            </CardContent>
            {/* <Typography variant="body1" color="text.secondary" marginLeft="2vh">
              Prix à la journée: {Number.isInteger(lawyer[0]) ? lawyer[0] : lawyer[0].replace(/\D/g, "")} €
            </Typography> */}
            {/* <CardActions sx={{justifyContent: "center"}}>
              <Button size="small" onClick={() => window.open(`${lawyer[3]}`, '_blank')}>Voir sur Malt.fr</Button>
            </CardActions> */}
          </Card>
        </Grid>
      ));
    } else {
      return <Typography gutterBottom variant="body" component="div" margin={"2vh"} sx={{ color: "grey" }}>
        En attente d'une recherche...
      </Typography>
    }
  }

  return (
    <>
      <Typography gutterBottom variant="body" component="div" marginLeft={"2vh"} sx={{ color: "white", marginTop: "1vh"}}>
        {consultationAvocat == null ? "Attente de résultats" : lawyersStore.consultationAvocat[lawyersStore.consultationAvocat.length - 1]} sur Malt.fr
      </Typography>
      <Grid container spacing={1}>
        {geConsultationAvocatCards()}
      </Grid>
      {consultationAvocat == null ? "" :
        <Typography gutterBottom variant="body" component="div" marginLeft={"2vh"} marginTop={"2vh"} sx={{ color: "white" }}>
          page {currentPage} sur {totalPages}
        </Typography>
      }
      {currentPage <= totalPages && currentPage >= 2 && 
        <Button onClick={() => setCurrentPage(currentPage - 1)} sx={{ color: "white", marginLeft: "1vh" }}>Page précédente</Button>
      }
      {currentPage < totalPages && 
        <Button onClick={() => setCurrentPage(currentPage + 1)} sx={{ color: "white", marginLeft: "1vh" }}>Page suivante</Button>
      }
    </>
  );
});