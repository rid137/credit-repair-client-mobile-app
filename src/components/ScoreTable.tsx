import { COLORS } from '@/constants';
import { scoresType } from '@/types/clientDetailsObj';
import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import { DateTime } from "luxon";
import { ActivityIndicator } from 'react-native';
import { Text } from 'react-native';

interface ScoresProps {
    scores: scoresType[]
    isLoading: boolean,
    isError: boolean
}

export const formatDate = (date: string) => {
    return DateTime.fromISO(date as string).toLocaleString(DateTime.DATE_MED)
}

const ScoreTable = ({scores, isLoading, isError}: ScoresProps) => {
    const [page, setPage] = React.useState<number>(0);
    const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(
        numberOfItemsPerPageList[0]
    );

    // console.log("scores", scores)

    const [items] = React.useState([
        {
            key: 1,
            name: '09/12/2022',
            calories: "778",
            fat: "778",
        },
        {
            key: 2,
            name: '09/12/2022',
            calories: "778",
            fat: "778",
        },
        {
            key: 3,
            name: '09/12/2022',
            calories: "778",
            fat: "778",
        },
        {
            key: 4,
            name: '09/12/2022',
            calories: "778",
            fat: "778",
        },
    ]);

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, scores?.length);

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);


    

  return (
    <ScrollView horizontal>
        <DataTable style={{width: "auto", flex: 1}}>
        {/* <DataTable.Header style={{justifyContent: "flex-start", alignItems: "flex-start"}}>
            <DataTable.Title textStyle={styles?.titleText}>Date</DataTable.Title>
            <DataTable.Title textStyle={styles?.titleText}>Experian Score</DataTable.Title>
            <DataTable.Title textStyle={styles?.titleText}>Equifax Scor</DataTable.Title>
            <DataTable.Title textStyle={styles?.titleText}>Transunion Scor</DataTable.Title>
        </DataTable.Header>

        {scores?.slice(from, to)?.map((item, index) => (
            <DataTable.Row key={index} style={{justifyContent: "flex-start", alignItems: "flex-start"}}>
            <DataTable.Cell textStyle={styles?.textColor}>{formatDate(item?.createdAt)}</DataTable.Cell>
            <DataTable.Cell textStyle={styles?.textColor} >{item?.experianScore}</DataTable.Cell>
            <DataTable.Cell textStyle={styles?.textColor}>{item?.equifaxScore}</DataTable.Cell>
            <DataTable.Cell textStyle={styles?.textColor}>{item?.transunionScore}</DataTable.Cell>
            </DataTable.Row>
        ))}

        <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(scores?.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${scores?.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={'Rows per page'}
            // paginationControlRippleColor="red"
            dropdownItemRippleColor="white"
            style={{justifyContent: "center", backgroundColor: COLORS?.primary, alignItems: "center"}}
            // label={}
        /> */}

            {
                isLoading ?
                    <ActivityIndicator size={"large"} />
                    :
                        isError ? 
                        <>
                            <Text>Something went wrong</Text>           
                        </>
                        :
                        <>
                            {
                                scores?.length > 0 ?
                                <>
                                    <DataTable.Header style={{justifyContent: "flex-start", alignItems: "flex-start"}}>
                                        <DataTable.Title textStyle={styles?.titleText}>Date</DataTable.Title>
                                        <DataTable.Title textStyle={styles?.titleText}>Experian Score</DataTable.Title>
                                        <DataTable.Title textStyle={styles?.titleText}>Equifax Score</DataTable.Title>
                                        <DataTable.Title textStyle={styles?.titleText}>Transunion Score</DataTable.Title>
                                    </DataTable.Header>

                                    {scores?.slice(from, to)?.map((item, index) => (
                                       <DataTable.Row key={index} style={{justifyContent: "flex-start", alignItems: "flex-start"}}>
                                       <DataTable.Cell textStyle={styles?.textColor}>{formatDate(item?.createdAt)}</DataTable.Cell>
                                       <DataTable.Cell textStyle={styles?.textColor} >{item?.experianScore}</DataTable.Cell>
                                       <DataTable.Cell textStyle={styles?.textColor}>{item?.equifaxScore}</DataTable.Cell>
                                       <DataTable.Cell textStyle={styles?.textColor}>{item?.transunionScore}</DataTable.Cell>
                                       </DataTable.Row>
                                    ))}

                                    <DataTable.Pagination
                                        page={page}
                                        numberOfPages={Math.ceil(scores?.length / itemsPerPage)}
                                        onPageChange={(page) => setPage(page)}
                                        label={`${from + 1}-${to} of ${scores?.length}`}
                                        numberOfItemsPerPageList={numberOfItemsPerPageList}
                                        numberOfItemsPerPage={itemsPerPage}
                                        onItemsPerPageChange={onItemsPerPageChange}
                                        showFastPaginationControls
                                        selectPageDropdownLabel={'Rows per page'}
                                        // paginationControlRippleColor="red"
                                        dropdownItemRippleColor="white"
                                        style={{justifyContent: "center", backgroundColor: COLORS?.primary, alignItems: "center"}}
                                        // label={}
                                    />
                                </> 
                                    :
                                <>
                                    <Text>No result found</Text>
                                </>
                            }
                        </>
                        
            }
    </DataTable>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
    titleText: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 10,
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
        // width: "25%"
    },
    textColor: {
        color: "#000",
        fontSize: 12,
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        // width: "25%"

    }
})

export default ScoreTable;