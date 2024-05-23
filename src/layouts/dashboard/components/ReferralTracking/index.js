import React, { useState, useEffect } from 'react';
import { Card, Stack } from '@mui/material';
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import colors from 'assets/theme/base/colors';
import linearGradient from 'assets/theme/functions/linearGradient';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

function ReferralTracking() {
    const { info, gradients } = colors;
    const { cardContent } = gradients;
    const [subscribingRate, setSubscribingRate] = useState(0);
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [stayingCustomers, setStayingCustomers] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const totalResponse = await axios.get('http://localhost:5000/total_clients');
                const stayingResponse = await axios.get('http://localhost:5000/staying_customers');
                const subscribingRateResponse = await axios.get('http://localhost:5000/subscribing_rate');

                setTotalCustomers(totalResponse.data.total_clients);
                setStayingCustomers(stayingResponse.data.staying);
                setSubscribingRate(subscribingRateResponse.data.rate);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Card
            sx={{
                height: '100%',
                background: linearGradient(gradients.cardDark.main, gradients.cardDark.state, gradients.cardDark.deg)
            }}>
            <VuiBox sx={{ width: '100%' }}>
					<VuiBox
						display='flex'
						flexDirection='column' // Changed from 'row' to 'column'
						alignItems='flex-start'
						sx={{ width: '100%' }}
						mb='40px'>
						<VuiTypography variant='lg' color='white' mr='auto' fontWeight='bold'>
							Subscription Rate
						</VuiTypography>
						<VuiTypography variant='button' color='text' fontWeight='regular' mb='20px'>
							High subscription Rate (Prediction 1)
						</VuiTypography>
					</VuiBox>
                <VuiBox
                    display='flex'
                    sx={({ breakpoints }) => ({
                        [breakpoints.up('xs')]: {
                            flexDirection: 'column',
                            gap: '16px',
                            justifyContent: 'center',
                            alignItems: 'center'
                        },
                        [breakpoints.up('md')]: {
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }
                    })}>
                    <Stack
                        direction='column'
                        spacing='20px'
                        width='500px'
                        maxWidth='50%'
                        sx={({ breakpoints }) => ({
                            mr: 'auto',
                            [breakpoints.only('md')]: {
                                mr: '75px'
                            },
                            [breakpoints.only('xl')]: {
                                width: '500px',
                                maxWidth: '40%'
                            }
                        })}>
                        <VuiBox
                            display='flex'
                            width='220px'
                            p='20px 22px'
                            flexDirection='column'
                            sx={({ breakpoints }) => ({
                                background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
                                borderRadius: '20px',
                                [breakpoints.up('xl')]: {
                                    maxWidth: '410px !important'
                                },
                                [breakpoints.up('xxl')]: {
                                    minWidth: '180px',
                                    maxWidth: '100% !important'
                                }
                            })}>
                            <VuiTypography color='text' variant='button' fontWeight='regular' mb='5px'>
                                Total
                            </VuiTypography>
                            <VuiTypography color='white' variant='lg' fontWeight='bold'>
                                {totalCustomers} Customers
                            </VuiTypography>
                        </VuiBox>
                        <VuiBox
                            display='flex'
                            width='220px'
                            p='20px 22px'
                            flexDirection='column'
                            sx={({ breakpoints }) => ({
                                background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
                                borderRadius: '20px',
                                [breakpoints.up('xl')]: {
                                    maxWidth: '410px !important'
                                },
                                [breakpoints.up('xxl')]: {
                                    minWidth: '180px',
                                    maxWidth: '100% !important'
                                }
                            })}>
                            <VuiTypography color='text' variant='button' fontWeight='regular' mb='5px'>
                                Staying
                            </VuiTypography>
                            <VuiTypography color='white' variant='lg' fontWeight='bold'>
                                {stayingCustomers} Customers
                            </VuiTypography>
                        </VuiBox>
                    </Stack>
                    <VuiBox sx={{ position: 'relative', display: 'inline-flex' }}>
                        <CircularProgress
                            variant='determinate'
                            value={subscribingRate}
                            size={window.innerWidth >= 1024 ? 200 : window.innerWidth >= 768 ? 170 : 200}
                            color='success'
                            
                        />
                        <VuiBox
                            sx={{
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: 'absolute',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <VuiBox display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
								<VuiTypography
									color='white'
									variant='h4' 
									fontWeight='bold'
									mb='4px'
									sx={({ breakpoints }) => ({
										[breakpoints.only('xl')]: {
											fontSize: '24px' 
										}
									})}>
									{subscribingRate.toFixed(2)}%
								</VuiTypography>
							</VuiBox>
                        </VuiBox>
                    </VuiBox>
                </VuiBox>
            </VuiBox>
        </Card>
    );
}

export default ReferralTracking;
