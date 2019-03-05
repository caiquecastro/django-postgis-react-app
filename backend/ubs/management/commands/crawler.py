from django.core.management.base import BaseCommand
from django.contrib.gis.geos import Point
import requests
from ubs.models import UBS

class Command(BaseCommand):
    help = "My shiny new management command."

    def handle(self, *args, **options):
        last_page = 1886
        for i in range(1, 1886) :
            r = requests.get('https://api-ldc-hackathon.herokuapp.com/api/ubs/' + str(i))
            models = []
            response = r.json()
            ubs = response['records']
            for u in ubs:
                model_ubs = UBS()
                model_ubs.vlr_latlon = Point(float(u['vlr_longitude']), float(u['vlr_latitude']))
                model_ubs.cod_munic = u['cod_munic']
                model_ubs.cod_cnes = u['cod_cnes']
                model_ubs.nom_estab = u['nom_estab']
                model_ubs.dsc_endereco = u['dsc_endereco']
                model_ubs.dsc_bairro = u['dsc_bairro']
                model_ubs.dsc_cidade = u['dsc_cidade']
                model_ubs.dsc_telefone = u['dsc_telefone']
                model_ubs.dsc_estrut_fisic_ambiencia = u['dsc_estrut_fisic_ambiencia']
                model_ubs.dsc_adap_defic_fisic_idosos = u['dsc_adap_defic_fisic_idosos']
                model_ubs.dsc_equipamentos = u['dsc_equipamentos']
                model_ubs.dsc_medicamentos = u['dsc_medicamentos']
                model_ubs.co_cep = u['co_cep']
                model_ubs.nom_estab = u['nom_estab']
                models.append(model_ubs)
            UBS.objects.bulk_create(models)
            
            print ("Pagina " + str(i) + " finalizada")