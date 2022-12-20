/**


import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#d11fb6",
    color: "white",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  viewer: {
    width: "100vw", //the pdf viewer will take up all of the width and height
    height: "100vh",
  },
});

// Create Document Component
function BasicDocument({ children }) {
  return (
    <PDFViewer style={styles.viewer}>
      {/* Start of the document
      <Document>
        {/*render a single page
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>{children}</Text>
          </View>
          <View style={styles.section}>
            <Text>World</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
    );
    */
//}
//export default BasicDocument;
