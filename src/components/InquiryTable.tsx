import { COLORS } from '@/constants';
import { InquiryType } from '@/types/clientDetailsObj';
import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import { Text } from 'react-native';
import { ScrollView, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';

interface InquiryProps {
    inquiries: InquiryType[]
    isLoading: boolean,
    isError: boolean
}


const InquiryTable = ({inquiries, isLoading, isError}: InquiryProps) => {
    const [page, setPage] = React.useState<number>(0);
    const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(
        numberOfItemsPerPageList[0]
    );

    // console.log("inquiries", inquiries)
    const [items] = React.useState([
        {
            key: 1,
            name: 'Dianne Russell',
            calories: "02/02/2022",
            fat: "Experian",
        },
        {
            key: 2,
            name: 'Dianne Russell',
            calories: "02/02/2022",
            fat: "Transunion",
        },
        {
            key: 3,
            name: 'Dianne Russell',
            calories: "02/02/2022",
            fat: "Equifax",
        },
        {
            key: 4,
            name: 'Dianne Russell',
            calories: "02/02/2022",
            fat: "Transunion",
        },
    ]);

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, inquiries?.length);

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

  return (
    <ScrollView horizontal>
        <DataTable style={{width: "auto", flex: 1}}>
            {/* {
                inquiries?.length >= 0 ?
                <>
                    <DataTable.Header style={{flex: 1, flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end"}}>
                        <DataTable.Title textStyle={styles?.titleText}>Name</DataTable.Title>
                        <DataTable.Title textStyle={styles?.titleText}>Date Of Inquiry</DataTable.Title>
                        <DataTable.Title textStyle={styles?.titleText}>Bureau</DataTable.Title>
                    </DataTable.Header>

                    {inquiries?.slice(from, to).map((item, index) => (
                        <DataTable.Row key={index} style={{justifyContent: "flex-start", alignItems: "flex-start"}}>
                        <DataTable.Cell textStyle={styles?.textColor}>{item?.name}</DataTable.Cell>
                        <DataTable.Cell textStyle={styles?.textColor} >{item?.date}</DataTable.Cell>
                        <DataTable.Cell textStyle={styles?.textColor}>{item?.bureau}</DataTable.Cell>
                        </DataTable.Row>
                    ))}

                    <DataTable.Pagination
                        page={page}
                        numberOfPages={Math.ceil(inquiries?.length / itemsPerPage)}
                        onPageChange={(page) => setPage(page)}
                        label={`${from + 1}-${to} of ${inquiries?.length}`}
                        numberOfItemsPerPageList={numberOfItemsPerPageList}
                        numberOfItemsPerPage={itemsPerPage}
                        onItemsPerPageChange={onItemsPerPageChange}
                        showFastPaginationControls
                        selectPageDropdownLabel={'Rows per page'}
                        // paginationControlRippleColor="red"
                        dropdownItemRippleColor="white"
                        style={{justifyContent: "center", backgroundColor: COLORS?.primary, alignItems: "center"}}
                    />
                </>
                    :
                <>
                    <ActivityIndicator />

                </>
            } */}
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
                                inquiries?.length > 0 ?
                                <>
                                    <DataTable.Header style={{flex: 1, flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end"}}>
                                        <DataTable.Title textStyle={styles?.titleText}>Name</DataTable.Title>
                                        <DataTable.Title textStyle={styles?.titleText}>Date Of Inquiry</DataTable.Title>
                                        <DataTable.Title textStyle={styles?.titleText}>Bureau</DataTable.Title>
                                    </DataTable.Header>

                                    {inquiries?.slice(from, to).map((item, index) => (
                                        <DataTable.Row key={index} style={{justifyContent: "flex-start", alignItems: "flex-start"}}>
                                        <DataTable.Cell textStyle={styles?.textColor}>{item?.name}</DataTable.Cell>
                                        <DataTable.Cell textStyle={styles?.textColor} >{item?.date}</DataTable.Cell>
                                        <DataTable.Cell textStyle={styles?.textColor}>{item?.bureau}</DataTable.Cell>
                                        </DataTable.Row>
                                    ))}

                                    <DataTable.Pagination
                                        page={page}
                                        numberOfPages={Math.ceil(inquiries?.length / itemsPerPage)}
                                        onPageChange={(page) => setPage(page)}
                                        label={`${from + 1}-${to} of ${inquiries?.length}`}
                                        numberOfItemsPerPageList={numberOfItemsPerPageList}
                                        numberOfItemsPerPage={itemsPerPage}
                                        onItemsPerPageChange={onItemsPerPageChange}
                                        showFastPaginationControls
                                        selectPageDropdownLabel={'Rows per page'}
                                        // paginationControlRippleColor="red"
                                        dropdownItemRippleColor="white"
                                        style={{justifyContent: "center", backgroundColor: COLORS?.primary, alignItems: "center"}}
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
        textAlign: "left"
    },
    textColor: {
        color: "#000",
        fontSize: 12,
        textAlign: "left"

    }
})

export default InquiryTable;