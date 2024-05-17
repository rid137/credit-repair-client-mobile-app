import Background from "@/components/BackgroundImage"
import BigTitle from "@/components/BigTitle";
import SmallTitle from "@/components/SmallTitle";
import { COLORS } from "@/constants";
import { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native"
import { View } from "react-native"
import { ProgressChart } from "react-native-chart-kit";
import { pickerSelectStyles } from "../(auth)/register";
// import RNPickerSelect from "react-native-picker-select";
import DisputeTable from "@/components/DisputeTable";
import InquiryTable from "@/components/InquiryTable";
import ScoreTable from "@/components/ScoreTable";
import ChartComponent from "@/components/ChartComponent";
import ExperianChart from "@/components/ExperianChart";
import { Link } from "expo-router";
import { UserAuth } from "@/hooks/useAuthContext";
import axios from "axios";
import { BASE_URL } from "../libs";
import { DisputeAccountType, InquiryType, scoresType } from "@/types/clientDetailsObj";
import { ActivityIndicator } from "react-native";
import { toast } from "@backpackapp-io/react-native-toast";
// import { Piechart } from "@/components/pie_chart";
import { number } from "zod";
import Dropdown from 'react-native-input-select';



export interface DataType {
    widthAndHeight: number,
    series1: number,
    series2: number,
    sliceColor1: string,
    sliceColor2: string
}

const FirstScreen = () => {
    const [ language, setLanguage ] = useState("");
    const [ clientDisputeAccounts, setClientDisputeAccounts] = useState<DisputeAccountType[] | null>(null)
    const [ clientInquiries, setClientInquiries] = useState<InquiryType[] | null>(null)
    const [ clientScores, setClientScores] = useState<scoresType[] | null>(null)

    const [country, setCountry] = useState("")

    const [isloading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    
    const { clientDetials, userAuthData } = UserAuth()

    const id = userAuthData?.userId
    const accessToken = userAuthData?.token

    const fetchDisputeAccounts = async () => {
        try {
            setIsLoading(true)
          const response = await axios.get(
            `${BASE_URL}/account/findUnattendedAccounts/${id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          const allAccountsData = response.data;

        //   setClientDisputeAccounts(allAccountsData);
            // setIsLoading(false)
          return allAccountsData;
        } catch (error) {
            setIsLoading(false)
          console.error('Error fetching all clients:', error);
        }
    };

  const fetchAllInquiries = async () => {
    try {
        setIsLoading(true)
      const response = await axios.get(
        `${BASE_URL}/inquiry/getInquiry/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // 'Content-Type': 'application/json',
          },
        }
      );
      const allInquiriesData = response.data;

    //   setClientInquiries(allInquiriesData);
        setIsLoading(false)
        return allInquiriesData;
    } catch (error) {
        // setIsLoading(false)
      console.error('Error fetching all inquiries:', error);
    }
  };


  const fetchAllScores = async () => {
    try {
        setIsLoading(true)
        const response = await axios.get(
            `${BASE_URL}/scores/getall/${id}?clientId=${id}`,
            {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                // 'Content-Type': 'application/json',
            },
            }
        );
        const allScoresData = response.data;

        //   setClientScores(allScoresData);
        // setIsLoading(false);
        return allScoresData;
    } catch (error) {
        setIsLoading(false) 
        console.error('Error fetching all Scores:', error);
    }
  };


  const fetchAllData = async () => {
    try {
      const [accountsData, inquiriesData, scoresData] = await Promise.all([
        fetchDisputeAccounts(),
        fetchAllInquiries(),
        fetchAllScores(),
      ]);
  
      setClientDisputeAccounts(accountsData);
      setClientInquiries(inquiriesData);
      setClientScores(scoresData);
    } catch (error) {
      console.error('Error fetching all data:', error);
    }
  };
  
  useEffect(() => {
    fetchAllData();
  }, []);
  

    var experianOption;
    var equifaxOption;
    var transunionOption;

    experianOption = {
        // tooltip: {
        //     trigger: 'item'
        // },
        // legend: {
        //     top: '5%',
        //     left: 'center'
        // },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['35%', '55%'],
                // avoidLabelOverlap: false,
                // roseType: 'angle',
                itemStyle: {
                    // borderRadius: [20, 5, 5, 10],
                    // borderColor: '#fff',
                    // borderWidth: 2
                    Background: "#f00",
                    Color: "#f00",
                    
                },
                label: {
                    // show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                    show: true,
                    fontSize: 60,
                    fontWeight: 'bold'
                    }
                },
                labelLine: {    
                    show: false
                },
                
                data: [
                    
                    { value: clientDetials?.experianScore, name: (clientDetials?.experianScore?.toString()), },
                    { value: 850 - Number(clientDetials?.experianScore), name:  (850 - Number(clientDetials?.experianScore)).toString() },
                ]
            }
        ]
    };

    equifaxOption = {
        // tooltip: {
        //     trigger: 'item'
        // },
        // legend: {
        //     top: '5%',
        //     left: 'center'
        // },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['35%', '55%'],
                // avoidLabelOverlap: false,
                label: {
                    // show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                    show: true,
                    fontSize: 60,
                    fontWeight: 'bold'
                    }
                },
                labelLine: {    
                    show: false
                },
                data: [
                    
                    { value: 484, name: '484' },
                    { value: 300, name: '' }
                ]
            }
        ]
    };

    transunionOption = {
        // tooltip: {
        //     trigger: 'item'
        // },
        // legend: {
        //     top: '5%',
        //     left: 'center'
        // },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['35%', '55%'],
                // avoidLabelOverlap: false,
                label: {
                    // show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                    show: true,
                    fontSize: 60,
                    fontWeight: 'bold'
                    }
                },
                labelLine: {    
                    show: false
                },
                data: [
                    
                    { value: 484, name: '484' },
                    { value: 300, name: '' }
                ]
            }
        ]
    };
    const widthAndHeight = 100;
  const series = [ 321, 623];
  const sliceColor = ['#002A70', '#9C9EA6'];

    const experianInfo: DataType = {
        widthAndHeight: 90,
        series1: clientDetials?.experianScore as number,
        series2: 850 - Number(clientDetials?.experianScore),
        sliceColor1: "#002A70",
        sliceColor2: "#9C9EA6"
    }

    const equifaxInfo: DataType = {
        widthAndHeight: 90,
        series1: clientDetials?.equifaxScore as number,
        series2: 850 - Number(clientDetials?.equifaxScore),
        sliceColor1: "#D92727",
        sliceColor2: "#9C9EA6"
    }

    const transunionInfo: DataType = {
        widthAndHeight: 90,
        series1: clientDetials?.transunionScore as number,
        series2: 850 - Number(clientDetials?.transunionScore),
        sliceColor1: "#1BA2D4",
        sliceColor2: "#9C9EA6"
    }


    // const firstData: any = [
    //     { name: clientDetials?.experianScore, value: Number(clientDetials?.experianScore), bg: "#002A70" },
    //     { name: 1000 - Number(clientDetials?.experianScore), value: 1000 - Number(clientDetials?.experianScore), bg: "#9C9EA6" },
    // ];
    
    // const secondData: any = [
    //     { name: clientDetials?.equifaxScore, value: Number(clientDetials?.equifaxScore), bg: "#D92727" },
    //     { name: 1000 - Number(clientDetials?.experianScore), value: 1000 - Number(clientDetials?.experianScore), bg: "#9C9EA6" },
    // ];
    
    // const thirdData: any = [
    //     { name: clientDetials?.transunionScore, value: Number(clientDetials?.transunionScore), bg: "#1BA2D4" },
    //     { name: 1000 - Number(clientDetials?.transunionScore), value: 1000 - Number(clientDetials?.transunionScore), bg: "#9C9EA6" },
    // ];


    
    return(
        <ScrollView contentContainerStyle={{backgroundColor: "#F5F5F5", paddingHorizontal: 15,}}>

        {/* <Link href={"/(drawer)/Security"} style={{marginTop: 20}} >Go TNavigate </Link> */}

            <View style={styles?.cardContainer}>
                <ScrollView horizontal>
                    <View style={styles?.chartContainer}>
                        <View>
                            {/* <Piechart data={firstData} /> */}
                            <ExperianChart data={experianInfo} />
                            {/* <ChartComponent option={experianOption}/> */}

                            <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                                <Text style={{fontWeight: "bold", fontSize: 16}}>Experian score</Text>
                                {/* <View style={{flexDirection: "row"}}>
                                    <Text style={{fontWeight: "bold"}}>Status : </Text>
                                    <Text>Client </Text>
                                </View>

                                <View style={{flexDirection: "row"}}>
                                    <Text style={{fontWeight: "bold"}}>Next Round Of Dispute :  </Text>
                                    <Text>8th April 2023</Text>
                                </View> */}

                            </View>
                        </View>

                        <View>

                            {/* <ChartComponent option={equifaxOption}  /> */}
                            <ExperianChart data={equifaxInfo} />

                            <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                                <Text style={{fontWeight: "bold", fontSize: 16}}>Equifax score</Text>
                            </View>
                        </View>

                        <View>

                            {/* <ChartComponent option={transunionOption}  /> */}
                            <ExperianChart data={transunionInfo} />
                            <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                                <Text style={{fontWeight: "bold", fontSize: 16}}>Transunion score</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 15}}>
                    <Text style={{fontWeight: "bold"}}>Status: </Text>
                    <Text>Client </Text>
                </View>

                <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 5}}>
                    <Text style={{fontWeight: "bold"}}>Next Round Of Dispute:  </Text>
                    <Text>8th April 2023</Text>
                </View>

            </View>


            <View style={styles?.cardContainer}>
                {/* FIRST PART */}
                <SmallTitle text="My Personal Details" />
                <View style={{marginLeft: 16, marginTop: 5}}>
                    <View style={{flexDirection: "row"}}>
                        <Text style={{fontWeight: "bold"}}>Name : </Text>
                        <Text>{clientDetials?.firstName} {clientDetials?.lastName}</Text>
                    </View>

                    <View style={{flexDirection: "row", marginVertical: 3}}>
                        <Text style={{fontWeight: "bold"}}>Phone Number : </Text>
                        <Text> {clientDetials?.phone}</Text>
                    </View>

                    <View style={{flexDirection: "row", marginBottom: 16}}>
                        <Text style={{fontWeight: "bold"}}>Email : </Text>
                        <Text> {clientDetials?.email}</Text>
                    </View>
                </View>

                {/* SECOND PART */}
                <SmallTitle text="Account Manager Details" />
                <View style={{marginLeft: 16, marginTop: 5}}>
                    <View style={{flexDirection: "row"}}>
                        <Text style={{fontWeight: "bold"}}>Name : </Text>
                        <Text>{clientDetials?.manager?.firstName ? clientDetials?.manager?.firstName : "Dainne"} {clientDetials?.manager?.lastName ? clientDetials?.manager?.lastName : "Russel"}</Text>
                    </View>

                    <View style={{flexDirection: "row", marginVertical: 3}}>
                        <Text style={{fontWeight: "bold"}}>Phone Number : </Text>
                        <Text> {clientDetials?.manager?.phone ? clientDetials?.manager?.phone : "09088661144"}</Text>
                    </View>

                    <View style={{flexDirection: "row"}}>
                        <Text style={{fontWeight: "bold"}}>Email : </Text>
                        <Text> {clientDetials?.manager?.email ? clientDetials?.manager?.email : "Russell7896@gmail.com"}</Text>
                    </View>
                </View>
            </View>

            {/* DISPUTE SECTION */}
            <View style={styles?.disputeSection}>
                <BigTitle text="Disputes Account By Month (2022)" />
                <Text style={{textAlign: "center", marginTop: 8}}>Listed below are the account we identified  to be challenged in each  month</Text>

                <View style={{flexDirection: "row", marginVertical: 15, gap: 16}}>
                    
                    {/* <RNPickerSelect
                        onValueChange={(language) => setLanguage(language)}
                        // placeholder={{ label: "Feb", value: null }}
                        placeholder={{ label: "Feb", value: "" }}
                        
                        useNativeAndroidPickerStyle={false}

                        items={[
                            { label: "Mar", value: "Mar" },
                            { label: "Apr", value: "Apr" },
                            { label: "May", value: "May" },
                            { label: "Jun", value: "Jun" },
                            { label: "Jul", value: "Jul" },
                            { label: "Aug", value: "Aug" },
                        ]}
                        style={pickerSelectStyles}
                    /> */}

                <View style={{width: "30%"}}>
                    <Dropdown
                        placeholder="Feb"
                        placeholderStyle={{color: "gray"}}
                        options={[
                            { label: 'Nigeria', value: 'NG' },
                            { label: 'Åland Islands', value: 'AX' },
                            { label: 'Algeria', value: 'DZ' },
                            { label: 'American Samoa', value: 'AS' },
                            { label: 'Andorra', value: 'AD' },
                        ]}
                        selectedValue={country}
                        onValueChange={(value: any) => setCountry(value)}
                        primaryColor={'green'}
                        dropdownIconStyle={{ top: 15, right: 20, display: "none" }}
                        dropdownStyle={{
                            backgroundColor:  COLORS?.inputBg,
                            paddingVertical: 7,
                            paddingHorizontal: 5,
                            minHeight: 30,
                            borderColor: COLORS?.primary,
                        }}
                    />
                </View>

                    {/* <RNPickerSelect
                        onValueChange={(language) => setLanguage(language)}
                        useNativeAndroidPickerStyle={false}

                        // placeholder={{ label: "2020", value: null }}
                        placeholder={{ label: "2020", value: "" }}

                        items={[
                            { label: "2021", value: "2021" },
                            { label: "2022", value: "2022" },
                            { label: "2023", value: "2023" },
                            { label: "2024", value: "2024" },
                            { label: "2025", value: "2025" },
                            { label: "2026", value: "2026" },
                        ]}
                        style={pickerSelectStyles}
                    /> */}

                <View style={{width: "30%"}}>
                    <Dropdown
                        placeholder="2024"
                        placeholderStyle={{color: "gray"}}
                        options={[
                            { label: 'Nigeria', value: 'NG' },
                            { label: 'Åland Islands', value: 'AX' },
                            { label: 'Algeria', value: 'DZ' },
                            { label: 'American Samoa', value: 'AS' },
                            { label: 'Andorra', value: 'AD' },
                        ]}
                        selectedValue={country}
                        onValueChange={(value: any) => setCountry(value)}
                        primaryColor={'green'}
                        dropdownIconStyle={{ top: 15, right: 20, display: "none" }}
                        dropdownStyle={{
                            backgroundColor: COLORS?.inputBg,
                            paddingVertical: 7,
                            paddingHorizontal: 5,
                            minHeight: 30,
                            borderColor: COLORS?.primary,
                        }}
                    />
                </View>

                    {/* <Text>
                    {
                        toast("This is my first toast", {
                            duration: 3000,
                          })
                    }
                    </Text> */}

                </View>
                
                
                <DisputeTable disputeAccounts={clientDisputeAccounts!!} isError={isError} isLoading={isloading} />


            </View>

            {/* INQUIRY SECTION */}
            <View style={styles?.disputeSection}>
                <BigTitle text="Inquiries Disputed By Month (2022)" />
                <Text style={{textAlign: "center", marginTop: 8}}>Listed below are the account we identified  to be challenged in each  month</Text>

                <View style={{flexDirection: "row", marginVertical: 15, gap: 16}}>
                    
                    {/* <RNPickerSelect
                        onValueChange={(language) => setLanguage(language)}
                        // placeholder={{ label: "Feb", value: null }}
                        placeholder={{ label: "Feb", value: "" }}
                        useNativeAndroidPickerStyle={false}

                        items={[
                            { label: "Mar", value: "Mar" },
                            { label: "Apr", value: "Apr" },
                            { label: "May", value: "May" },
                            { label: "Jun", value: "Jun" },
                            { label: "Jul", value: "Jul" },
                            { label: "Aug", value: "Aug" },
                        ]}
                        style={pickerSelectStyles}
                    /> */}

                    <View style={{width: "30%"}}>
                        <Dropdown
                            placeholder="Feb"
                            placeholderStyle={{color: "gray"}}
                            options={[
                                { label: 'Nigeria', value: 'NG' },
                                { label: 'Åland Islands', value: 'AX' },
                                { label: 'Algeria', value: 'DZ' },
                                { label: 'American Samoa', value: 'AS' },
                                { label: 'Andorra', value: 'AD' },
                            ]}
                            selectedValue={country}
                            onValueChange={(value: any) => setCountry(value)}
                            primaryColor={'green'}
                            dropdownIconStyle={{ top: 15, right: 20, display: "none" }}
                            dropdownStyle={{
                                backgroundColor:  COLORS?.inputBg,
                                paddingVertical: 7,
                                paddingHorizontal: 5,
                                minHeight: 30,
                                borderColor: COLORS?.primary,
                            }}
                        />
                    </View>

                    {/* <RNPickerSelect
                        onValueChange={(language) => setLanguage(language)}
                        useNativeAndroidPickerStyle={false}

                        // placeholder={{ label: "2020", value: null }}
                        placeholder={{ label: "2020", value: " " }}
                        items={[
                            { label: "2021", value: "2021" },
                            { label: "2022", value: "2022" },
                            { label: "2023", value: "2023" },
                            { label: "2024", value: "2024" },
                            { label: "2025", value: "2025" },
                            { label: "2026", value: "2026" },
                        ]}
                        style={pickerSelectStyles}
                    /> */}

                    <View style={{width: "30%"}}>
                        <Dropdown
                            placeholder="2024"
                            placeholderStyle={{color: "gray"}}
                            options={[
                                { label: 'Nigeria', value: 'NG' },
                                { label: 'Åland Islands', value: 'AX' },
                                { label: 'Algeria', value: 'DZ' },
                                { label: 'American Samoa', value: 'AS' },
                                { label: 'Andorra', value: 'AD' },
                            ]}
                            selectedValue={country}
                            onValueChange={(value: any) => setCountry(value)}
                            primaryColor={'green'}
                            dropdownIconStyle={{ top: 15, right: 20, display: "none" }}
                            dropdownStyle={{
                                backgroundColor:  COLORS?.inputBg,
                                paddingVertical: 7,
                                paddingHorizontal: 5,
                                minHeight: 30,
                                borderColor: COLORS?.primary,
                            }}
                        />
                    </View>

                </View>

                <InquiryTable inquiries={clientInquiries!} isError={isError} isLoading={isloading} />


            </View>

            {/* SCORES SECTION */}
            <View style={styles?.disputeSection}>
                <BigTitle text="Scores Over Time" />
                <Text style={{textAlign: "center", marginTop: 8}}>Scores are impacted by many factors and not just removed or new account. If you have questions on your score please contact your Account Manager</Text>

                <ScoreTable scores={clientScores!} isLoading={isloading} isError={isError} />

            </View>
            

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    cardContainer: {
        backgroundColor: COLORS?.deepGrayBg,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginTop: 20,
        zIndex: -10
    },
    chartContainer: {
        flexDirection: "row",
        gap: 30
    },
    disputeSection: {
        marginTop: 20,
        backgroundColor: COLORS?.deepGrayBg,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        paddingVertical: 15,
        paddingHorizontal: 20,
    }
    
})

export default FirstScreen











            // <View style={styles?.container}>
            // <View>
            //     <ProgressChart
            //         data={data}
            //         // width={screenWidth}
            //         width= {300}
            //         height={220}
            //         strokeWidth={13}
            //         radius={40}
            //         chartConfig={chartConfig}
            //         hideLegend={false}
            //     />
            // </View>
            // <View>
            //     <ProgressChart
            //         data={data}
            //         // width={screenWidth}
            //         width= {300}
            //         height={220}
            //         strokeWidth={13}
            //         radius={40}
            //         chartConfig={chartConfig}
            //         hideLegend={false}
            //     />
            // </View>
            // <View>
            //     <ProgressChart
            //         data={data}
            //         // width={screenWidth}
            //         width= {300}
            //         height={220}
            //         strokeWidth={13}
            //         radius={40}
            //         chartConfig={chartConfig}
            //         hideLegend={false}
            //     />
            // </View>

            // </View>

            // <View>
                
            // </View>