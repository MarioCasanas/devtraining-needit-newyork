function onChange(control, oldValue, newValue, isLoading) {    
    if (isLoading || newValue == '') {
        return;
    }

    var reportar = g_form.getValue('qu_desea_reportar');
    //g_form.addInfoMessage('Reportar: ' + reportar + ' - newValue: ' + newValue);

    //Saco la mandatoriedad a TODOS los campos.
    /*
    g_form.setMandatory('qu_desea_reportar', false);
    g_form.setMandatory('cu_ntos_inventarios_desear_reportar', false);
    */
    g_form.setMandatory('inventario', false);
    /*
    g_form.setMandatory('cr_plaza', false);
    g_form.setMandatory('cr_tienda', false);
    g_form.setMandatory('store_n_mero_de_retek', false);
    g_form.setMandatory('fecha_inicial_del_inventario', false);
    g_form.setMandatory('fecha_de_inventario', false);
    g_form.setMandatory('movimiento', false);
    g_form.setMandatory('fecha_de_inventario_a_cancelar', false);
    g_form.setMandatory('log_de_cierre_autom_tico', false);
    g_form.setMandatory('fecha_de_movimiento', false);
    g_form.setMandatory('totales_por_tecla_en_formato_txt', false);
    g_form.setMandatory('fecha_final_del_inventario', false);
    g_form.setMandatory('saldo_diario_previo', false);
    g_form.setMandatory('fecha_de_movimiento_correcto', false);
    g_form.setMandatory('formatter', false);
    */
    g_form.setMandatory('m_s_de_1_inventario', false);
    /*
    g_form.setMandatory('previo_de_cada_una_de_las_tiendas_con_el_incidente', false);
    g_form.setMandatory('tira_con_totales_por_tecla_en_formato_txt', false);
    g_form.setMandatory('aqu_puede_descargar_el_formato', false);
    g_form.setMandatory('formato_en_excel_de_cada_tienda_con_la_informaci_n_correspondiente', false);
    g_form.setMandatory('formatter2', false);*/
    g_form.setMandatory('adjuntar_validaci_n_de_sdi_en_simoti', false);
    g_form.setMandatory('adjuntar_validaci_n_de_adj_en_simoti', false);
    g_form.setMandatory('toda_diferencia_en_inventario_inicial_es_por_diferencia_en_inventario_anterior_favor_de_cancelar', false);

    g_form.setDisplay('inventario', false);
    g_form.setDisplay('m_s_de_1_inventario', false);

    if (reportar!='') {
        
        g_form.setDisplay('inventario', true);
        g_form.setDisplay('m_s_de_1_inventario', true);

        if (newValue == '1_inventario') {

            //g_form.addInfoMessage('ENTRO ' + reportar);
            g_form.setDisplay('m_s_de_1_inventario', false);
    
            if (reportar == 'no_se_muestra_linea_de_inventario_fisico') {
    
                g_form.setDisplay('cr_plaza', true);                
                g_form.setDisplay('cr_tienda', true);
                g_form.setDisplay('store_n_mero_de_retek', true);
                g_form.setDisplay('fecha_de_inventario', false);
                g_form.setDisplay('movimiento', false);
                g_form.setDisplay('fecha_de_inventario_a_cancelar', false);
                g_form.setDisplay('fecha_inicial_del_inventario', true);
                g_form.setDisplay('totales_por_tecla_en_formato_txt', false);
                g_form.setDisplay('fecha_final_del_inventario', true);
                g_form.setDisplay('log_de_cierre_autom_tico', false);
                g_form.setDisplay('fecha_de_movimiento', false);
                g_form.setDisplay('fecha_de_movimiento_correcto', false);
                g_form.setDisplay('saldo_diario_previo', true);
                g_form.setDisplay('previo_de_cada_una_de_las_tiendas_con_el_incidente', false);
                g_form.setDisplay('tira_con_totales_por_tecla_en_formato_txt', false);
                g_form.setDisplay('aqu_puede_descargar_el_formato', false);
                g_form.setDisplay('formato_en_excel_de_cada_tienda_con_la_informaci_n_correspondiente', false);
                g_form.setDisplay('adjuntar_validaci_n_de_sdi_en_simoti', true);
                g_form.setDisplay('adjuntar_validaci_n_de_adj_en_simoti', true);
                g_form.setDisplay('toda_diferencia_en_inventario_inicial_es_por_diferencia_en_inventario_anterior_favor_de_cancelar', false);
                
                g_form.setMandatory('qu_desea_reportar', true);
                g_form.setMandatory('cu_ntos_inventarios_desear_reportar', true);
                g_form.setMandatory('cr_plaza', true);                
                g_form.setMandatory('cr_tienda', true);
                g_form.setMandatory('store_n_mero_de_retek', true);
                g_form.setMandatory('fecha_inicial_del_inventario', true);
                g_form.setMandatory('fecha_final_del_inventario', true);
                g_form.setMandatory('saldo_diario_previo', true);
                g_form.setMandatory('adjuntar_validaci_n_de_sdi_en_simoti', true);
                g_form.setMandatory('adjuntar_validaci_n_de_adj_en_simoti', true);
          
            } else if (reportar == 'se_muestra_leyenda_no_se_ejecuto_el_espejeo_al_correr_el_cierre_automatico') {
    
                g_form.setDisplay('inventario', true);

                g_form.setMandatory('cr_plaza', true);
                g_form.setMandatory('cr_tienda', true);
                g_form.setMandatory('store_n_mero_de_retek', true);
                g_form.setMandatory('fecha_de_inventario', true);
                g_form.setMandatory('log_de_cierre_autom_tico', true);

                g_form.setDisplay('fecha_de_inventario_a_cancelar', false);
                g_form.setDisplay('fecha_inicial_del_inventario', false);
                g_form.setDisplay('totales_por_tecla_en_formato_txt', false);
                g_form.setDisplay('fecha_final_del_inventario', false);
                g_form.setDisplay('fecha_de_movimiento', false);
                g_form.setDisplay('fecha_de_movimiento_correcto', false);
                g_form.setDisplay('saldo_diario_previo', false);
                g_form.setDisplay('movimiento', false);                
                g_form.setDisplay('adjuntar_validaci_n_de_sdi_en_simoti', false);
                g_form.setDisplay('adjuntar_validaci_n_de_adj_en_simoti', false);

           
            } else if (reportar == 'solicitud_de_abrir_uno_o_mas_inventarios') {
    
                g_form.setDisplay('cr_plaza', false);
                g_form.setDisplay('cr_tienda', false);
                g_form.setDisplay('fecha_de_inventario', false);
                g_form.setDisplay('fecha_de_inventario_a_cancelar', true);
                g_form.setDisplay('movimiento', false);
                g_form.setDisplay('fecha_inicial_del_inventario', false);
                g_form.setDisplay('totales_por_tecla_en_formato_txt', false);
                g_form.setDisplay('fecha_final_del_inventario', false);
                g_form.setDisplay('log_de_cierre_autom_tico', false);
                g_form.setDisplay('fecha_de_movimiento', false);
                g_form.setDisplay('fecha_de_movimiento_correcto', false);
                g_form.setDisplay('saldo_diario_previo', false);
                g_form.setDisplay('adjuntar_validaci_n_de_sdi_en_simoti', false);
                g_form.setDisplay('adjuntar_validaci_n_de_adj_en_simoti', false);

                g_form.setMandatory('store_n_mero_de_retek', true);
                g_form.setMandatory('fecha_de_inventario_a_cancelar', true);
    
            } else if (reportar == 'cambio_de_fecha_administrativa') {
    
                g_form.setDisplay('m_s_de_1_inventario', true);

                g_form.setDisplay('fecha_de_inventario', false);
                g_form.setDisplay('fecha_de_inventario_a_cancelar', false);
                g_form.setDisplay('fecha_inicial_del_inventario', false);
                g_form.setDisplay('totales_por_tecla_en_formato_txt', false);
                g_form.setDisplay('fecha_final_del_inventario', false);
                g_form.setDisplay('log_de_cierre_autom_tico', false);                
                g_form.setDisplay('fecha_de_movimiento', true);
                g_form.setDisplay('fecha_de_movimiento_correcto', true);
                g_form.setDisplay('saldo_diario_previo', false);
                g_form.setDisplay('previo_de_cada_una_de_las_tiendas_con_el_incidente', false);
                g_form.setDisplay('tira_con_totales_por_tecla_en_formato_txt', false);                
                g_form.setDisplay('aqu_puede_descargar_el_formato', true);
                g_form.setDisplay('formato_en_excel_de_cada_tienda_con_la_informaci_n_correspondiente', true);
                g_form.setDisplay('adjuntar_validaci_n_de_sdi_en_simoti', false);
                g_form.setDisplay('adjuntar_validaci_n_de_adj_en_simoti', false);
                g_form.setDisplay('toda_diferencia_en_inventario_inicial_es_por_diferencia_en_inventario_anterior_favor_de_cancelar', false);

                g_form.setMandatory('cr_plaza', true);
                g_form.setMandatory('cr_tienda', true);
                g_form.setMandatory('store_n_mero_de_retek', true);                
                g_form.setMandatory('movimiento', true);
                g_form.setMandatory('fecha_de_movimiento', true);                
                g_form.setMandatory('fecha_de_movimiento_correcto', true);
                g_form.setMandatory('formato_en_excel_de_cada_tienda_con_la_informaci_n_correspondiente', true);                
         
            } else if (reportar == 'diferencia_en_totales_por_teclas') {
    
                g_form.setDisplay('movimiento', false);
                g_form.setDisplay('fecha_de_inventario', true);
                g_form.setDisplay('totales_por_tecla_en_formato_txt', true);
                g_form.setDisplay('fecha_de_inventario_a_cancelar', false);
                g_form.setDisplay('fecha_inicial_del_inventario', false);
                g_form.setDisplay('fecha_final_del_inventario', false);
                g_form.setDisplay('log_de_cierre_autom_tico', false);
                g_form.setDisplay('fecha_de_movimiento', false);
                g_form.setDisplay('fecha_de_movimiento_correcto', false);
                g_form.setDisplay('saldo_diario_previo', false);
                g_form.setDisplay('adjuntar_validaci_n_de_sdi_en_simoti', false);
                g_form.setDisplay('adjuntar_validaci_n_de_adj_en_simoti', false);
                
                g_form.setMandatory('cr_plaza', true);
                g_form.setMandatory('cr_tienda', true);
                g_form.setMandatory('store_n_mero_de_retek', true);                
                g_form.setMandatory('fecha_de_inventario', true);                
                g_form.setMandatory('totales_por_tecla_en_formato_txt', true);
    
            }
    
        } else if (newValue == 'mas_de_1_inventario') {
            
            g_form.setDisplay('inventario', false);
    
            if (reportar == 'no_se_muestra_linea_de_inventario_fisico') {
    
                g_form.setDisplay('previo_de_cada_una_de_las_tiendas_con_el_incidente', true);
                g_form.setDisplay('aqu_puede_descargar_el_formato', true);
                g_form.setDisplay('formato_en_excel_de_cada_tienda_con_la_informaci_n_correspondiente', true);
                g_form.setDisplay('tira_con_totales_por_tecla_en_formato_txt', false);
                g_form.setDisplay('toda_diferencia_en_inventario_inicial_es_por_diferencia_en_inventario_anterior_favor_de_cancelar', false);

                g_form.setMandatory('previo_de_cada_una_de_las_tiendas_con_el_incidente', true);
                g_form.setMandatory('aqu_puede_descargar_el_formato', true);
                g_form.setMandatory('formato_en_excel_de_cada_tienda_con_la_informaci_n_correspondiente', true);
                g_form.setMandatory('adjuntar_validaci_n_de_sdi_en_simoti', true);
                g_form.setMandatory('adjuntar_validaci_n_de_adj_en_simoti', true);
    
            } else if (reportar == 'se_muestra_leyenda_no_se_ejecuto_el_espejeo_al_correr_el_cierre_automatico') {

                g_form.setDisplay('tira_con_totales_por_tecla_en_formato_txt', false);
                g_form.setDisplay('adjuntar_validaci_n_de_sdi_en_simoti', false);
                g_form.setDisplay('adjuntar_validaci_n_de_adj_en_simoti', false);
                g_form.setDisplay('toda_diferencia_en_inventario_inicial_es_por_diferencia_en_inventario_anterior_favor_de_cancelar', false);
                
                g_form.setMandatory('previo_de_cada_una_de_las_tiendas_con_el_incidente', true);
                g_form.setMandatory('formato_en_excel_de_cada_tienda_con_la_informaci_n_correspondiente', true);
    
            } else if (reportar == 'solicitud_de_abrir_uno_o_mas_inventarios') {
    
                g_form.setDisplay('previo_de_cada_una_de_las_tiendas_con_el_incidente', false);
                g_form.setDisplay('tira_con_totales_por_tecla_en_formato_txt', false);
                g_form.setDisplay('adjuntar_validaci_n_de_sdi_en_simoti', false);
                g_form.setDisplay('adjuntar_validaci_n_de_adj_en_simoti', false);
                g_form.setDisplay('toda_diferencia_en_inventario_inicial_es_por_diferencia_en_inventario_anterior_favor_de_cancelar', false);

                g_form.setMandatory('formato_en_excel_de_cada_tienda_con_la_informaci_n_correspondiente', true);
    
            } else if (reportar == 'cambio_de_fecha_administrativa') {
    
                g_form.setDisplay('aqu_puede_descargar_el_formato', true);
                g_form.setDisplay('formato_en_excel_de_cada_tienda_con_la_informaci_n_correspondiente', true);

                g_form.setMandatory('formato_en_excel_de_cada_tienda_con_la_informaci_n_correspondiente', true);
    
            } else if (reportar == 'diferencia_en_totales_por_teclas') {
    
                g_form.setDisplay('previo_de_cada_una_de_las_tiendas_con_el_incidente', false);
                g_form.setDisplay('adjuntar_validaci_n_de_sdi_en_simoti', false);
                g_form.setDisplay('adjuntar_validaci_n_de_adj_en_simoti', false);
                g_form.setDisplay('toda_diferencia_en_inventario_inicial_es_por_diferencia_en_inventario_anterior_favor_de_cancelar', false);

                g_form.setMandatory('tira_con_totales_por_tecla_en_formato_txt', true);
                g_form.setMandatory('formato_en_excel_de_cada_tienda_con_la_informaci_n_correspondiente', true);
    
            }        
        }
    }
}