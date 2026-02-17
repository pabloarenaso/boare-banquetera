"use client";

import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";
import { EventDetails, Quote, QuoteItem } from "@/domain/pricing/types";

// Register fonts if needed (optional for now, using standard fonts)
// Font.register({ family: 'Roboto', src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf' });

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        fontSize: 10,
        color: '#333'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10
    },
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#d97706' // Amber-600
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    },
    section: {
        marginBottom: 20
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: '#eee',
        paddingVertical: 5
    },
    headerRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        paddingVertical: 5,
        fontWeight: 'bold',
        backgroundColor: '#f5f5f5'
    },
    col1: { width: '50%' },
    col2: { width: '15%', textAlign: 'center' },
    col3: { width: '15%', textAlign: 'right' },
    col4: { width: '20%', textAlign: 'right' },

    totalSection: {
        marginTop: 20,
        alignItems: 'flex-end'
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingVertical: 3
    },
    totalLabel: {
        width: 100,
        textAlign: 'right',
        marginRight: 10,
        fontWeight: 'bold'
    },
    totalValue: {
        width: 100,
        textAlign: 'right',
        fontFamily: 'Helvetica-Bold'
    },
    footer: {
        marginTop: 50,
        textAlign: 'center',
        fontSize: 8,
        color: '#666'
    }
});

interface QuotePDFProps {
    quote: Quote;
    event: EventDetails;
    client: { fullName: string; email: string; phone: string };
    quoteId?: string;
}

export const QuotePDF = ({ quote, event, client, quoteId }: QuotePDFProps) => {
    const formatMoney = (amount: number) => `$${amount.toLocaleString("es-CL")}`;

    return (
        <Document>
            <Page size="LETTER" style={styles.page}>

                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.logo}>BOARÉ</Text>
                        <Text style={{ fontSize: 9, marginTop: 4 }}>Banquetería & Eventos</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>COTIZACIÓN</Text>
                        <Text style={{ fontSize: 10, marginTop: 4 }}>{quoteId ? `#${quoteId.slice(0, 8).toUpperCase()}` : 'BORRADOR'}</Text>
                        <Text style={{ fontSize: 9, marginTop: 2 }}>{new Date().toLocaleDateString()}</Text>
                    </View>
                </View>

                {/* Client & Event Info */}
                <View style={{ flexDirection: 'row', marginBottom: 30, fontSize: 10 }}>
                    <View style={{ width: '50%' }}>
                        <Text style={{ fontFamily: 'Helvetica-Bold', marginBottom: 5, fontSize: 11 }}>Cliente:</Text>
                        <Text>{client.fullName}</Text>
                        <Text>{client.email}</Text>
                        <Text>{client.phone}</Text>
                    </View>
                    <View style={{ width: '50%' }}>
                        <Text style={{ fontFamily: 'Helvetica-Bold', marginBottom: 5, fontSize: 11 }}>Detalles del Evento:</Text>
                        <Text>Tipo: {event.type ? event.type.toUpperCase() : 'N/A'}</Text>
                        <Text>Fecha: {event.date instanceof Date ? event.date.toLocaleDateString() : 'Por definir'}</Text>
                        <Text>Invitados: {event.guests}</Text>
                    </View>
                </View>

                {/* Table Header */}
                <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 5, marginBottom: 5 }}>
                    <Text style={{ width: '50%', fontFamily: 'Helvetica-Bold' }}>Descripción</Text>
                    <Text style={{ width: '10%', textAlign: 'center', fontFamily: 'Helvetica-Bold' }}>Cant.</Text>
                    <Text style={{ width: '20%', textAlign: 'right', fontFamily: 'Helvetica-Bold' }}>Precio Un.</Text>
                    <Text style={{ width: '20%', textAlign: 'right', fontFamily: 'Helvetica-Bold' }}>Total</Text>
                </View>

                {/* Table Rows */}
                {quote.items.map((item, index) => (
                    <View key={index} style={{ flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: '#eee', paddingVertical: 4 }}>
                        <Text style={{ width: '50%' }}>{item.name}</Text>
                        <Text style={{ width: '10%', textAlign: 'center' }}>{item.quantity}</Text>
                        <Text style={{ width: '20%', textAlign: 'right' }}>{item.unit_price.toLocaleString("es-CL")}</Text>
                        <Text style={{ width: '20%', textAlign: 'right' }}>{(item.unit_price * item.quantity).toLocaleString("es-CL")}</Text>
                    </View>
                ))}

                {/* Totals */}
                <View style={styles.totalSection}>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total Evento:</Text>
                        <Text style={styles.totalValue}>{formatMoney(quote.total)}</Text>
                    </View>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Valor p/p:</Text>
                        <Text style={{ width: 100, textAlign: 'right' }}>{formatMoney(Math.round(quote.total / event.guests))}</Text>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text>Gracias por cotizar con Boaré Banquetería.</Text>
                    <Text>Esta cotización es válida por 15 días.</Text>
                    <Text>Contacto: contacto@boare.cl | +56 9 1234 5678</Text>
                </View>
            </Page>
        </Document>
    );
};
