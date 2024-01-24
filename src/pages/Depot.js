import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Fade,
  Box,
} from "@mui/material";
import {
  DirectionsBus,
  FlashOn,
  Warning,
  CheckBoxOutlineBlank,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

// Depot component definition
const Depot = () => {
  // Translation hook
  const { t } = useTranslation();

  // Array of bus names
  const busNames = [
    t("ElectricBus001"),
    t("ElectricBus002"),
    t("ElectricBus003"),
    t("ElectricBus004"),
    t("ElectricBus005"),
    t("ElectricBus006"),
    t("ElectricBus007"),
    t("ElectricBus008"),
    t("ElectricBus009"),
    t("ElectricBus010"),
    t("ElectricBus011"),
    t("ElectricBus012"),
    t("ElectricBus013"),
    t("ElectricBus014"),
    t("ElectricBus015"),
    t("ElectricBus016"),
    t("ElectricBus017"),
    t("ElectricBus018"),
    t("ElectricBus019"),
    t("ElectricBus020"),
    t("ElectricBus021"),
    t("ElectricBus022"),
    t("ElectricBus023"),
    t("ElectricBus024"),
    t("ElectricBus025"),
    t("ElectricBus026"),
    t("ElectricBus027"),
    t("ElectricBus028"),
    t("ElectricBus029"),
    t("ElectricBus030"),
    t("ElectricBus031"),
    t("ElectricBus032"),
    t("ElectricBus033"),
    t("ElectricBus034"),
    t("ElectricBus035"),
    t("ElectricBus036"),
    t("ElectricBus037"),
    t("ElectricBus038"),
    t("ElectricBus039"),
    t("ElectricBus040"),
  ];

  // Function to get a random unused bus name
  const getRandomBusName = (usedNames) => {
    const availableNames = busNames.filter((name) => !usedNames.includes(name));
    const randomIndex = Math.floor(Math.random() * availableNames.length);
    const selectedName = availableNames[randomIndex];
    return selectedName;
  };

  // State for changing card indices and used bus names
  const [changingCardIndices, setChangingCardIndices] = useState([]);
  const [usedBusNamesMap, setUsedBusNamesMap] = useState({});
  // State for the cards
  const [cards, setCards] = useState(
    Array.from({ length: 40 }, () => ({
      state: 0,
      charge: 0,
      busName: getRandomBusName([]),
    }))
  );

  // useEffect to simulate changes in the cards and data
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndices = [];
      while (randomIndices.length < 10) {
        const randomIndex = Math.floor(Math.random() * 40);
        if (!randomIndices.includes(randomIndex)) {
          randomIndices.push(randomIndex);
        }
      }

      const updatedUsedBusNamesMap = { ...usedBusNamesMap };
      randomIndices.forEach((index) => {
        const newBusName =
          cards[index].state === 0
            ? getRandomBusName(Object.values(updatedUsedBusNamesMap))
            : cards[index].busName;
        updatedUsedBusNamesMap[index] = newBusName;
      });

      const updatedCards = cards.map((card, index) => ({
        state: changingCardIndices.includes(index)
          ? Math.floor(Math.random() * 4)
          : card.state,
        charge: Math.floor(Math.random() * (99 - 20 + 1) + 20),
        busName: updatedUsedBusNamesMap[index],
      }));

      setCards(updatedCards);
      setChangingCardIndices(randomIndices);
      setUsedBusNamesMap(updatedUsedBusNamesMap);
    }, 5000);

    return () => clearInterval(interval);
  }, [cards, changingCardIndices, usedBusNamesMap]);

  // Function to get the content for the card based on its state
  const getCardContent = (state, charge, busName) => {
    switch (state) {
      case 0:
        return null;
      case 1:
      case 2:
        return (
          <CardContent
            style={{ height: "50px", borderBottom: "1px solid lightGrey" }}
          >
            <Box display='flex' alignItems='center'>
              <Typography variant='body2'>{busName}</Typography>
              <Typography variant='body2' style={{ marginLeft: "20px" }}>
                {t("Charge")}: {charge}%
              </Typography>
            </Box>
          </CardContent>
        );
      case 3:
        return null;
      default:
        return null;
    }
  };

  // Function to get the corresponding icon based on the card state
  const getIcon = (state) => {
    switch (state) {
      case 1:
        return <DirectionsBus sx={{ color: "blue", marginTop: "5px" }} />;
      case 2:
        return <FlashOn sx={{ color: "lightgreen", marginTop: "5px" }} />;
      case 3:
        return <Warning sx={{ color: "red", marginTop: "30px" }} />;
      default:
        return null;
    }
  };

  // Function to get the border color for the card based on its state
  const getIconBorderColor = (state) => {
    switch (state) {
      case 1:
        return "blue";
      case 2:
        return "lightgreen";
      case 3:
        return "red";
      default:
        return "black";
    }
  };

  // JSX structure for the Depot component
  return (
    <div>
      <Grid container direction='column' mb={2}>
        <Card style={{ position: "fixed", width: "100%", zIndex: "1000" }}>
          <CardContent style={{ padding: 0 }}>
            <Box margin='30px'>
              <Typography variant='h6' style={{ margin: "30px 0" }}>
                {t("Legenda")}
              </Typography>
              <Grid container spacing={2} alignItems='center'>
                <Grid item>
                  <Box display='flex' alignItems='center' margin='0 30px'>
                    <CheckBoxOutlineBlank
                      style={{ marginRight: "5px", color: "black" }}
                    />
                    <Typography variant='body2' style={{ marginLeft: "5px" }}>
                      {t("LIBERO")}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Box display='flex' alignItems='center' margin='0 30px'>
                    <DirectionsBus
                      style={{ marginRight: "5px", color: "blue" }}
                    />
                    <Typography variant='body2'>{t("STANDBY")}</Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Box display='flex' alignItems='center' margin='0 30px'>
                    <FlashOn
                      style={{ marginRight: "5px", color: "lightgreen" }}
                    />
                    <Typography variant='body2'>{t("IN CARICA")}</Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Box display='flex' alignItems='center' margin='0 30px'>
                    <Warning style={{ marginRight: "5px", color: "red" }} />
                    <Typography variant='body2'>{t("ERRORE")}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <div style={{ marginTop: "170px" }}>
        <Grid container spacing={2}>
          {cards.map((card, index) => (
            <Grid item xs={2} key={index}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Typography variant='h6' style={{ marginLeft: "25px" }}>
                  {index + 1}
                </Typography>
                <Card
                  sx={{
                    width: 250,
                    height: 150,
                    border: `5px solid ${getIconBorderColor(card.state)}`,
                  }}
                >
                  <Grid container>
                    <Grid item container>
                      <Box width='100%' display='flex' justifyContent='center'>
                        {getCardContent(card.state, card.charge, card.busName)}
                      </Box>
                    </Grid>
                    <Grid item container justifyContent='center'>
                      <Fade in={true} timeout={2000}>
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: "30px",
                          }}
                        >
                          <IconButton>
                            {getIcon(card.state) &&
                              React.cloneElement(getIcon(card.state), {
                                style: { fontSize: "70px" },
                              })}
                          </IconButton>
                        </div>
                      </Fade>
                    </Grid>
                  </Grid>
                </Card>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Depot;
