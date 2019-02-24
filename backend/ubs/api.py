from django.conf.urls import url, include
from rest_framework import routers, serializers, viewsets
from ubs.models import UBS
from django.contrib.gis.geos import Point
from django.contrib.gis.db.models.functions import Distance

class UbsSerializer(serializers.HyperlinkedModelSerializer):
    latitude = serializers.SerializerMethodField()
    longitude = serializers.SerializerMethodField()
    distancia = serializers.SerializerMethodField()

    class Meta:
        model = UBS
        fields = (
            'nom_estab',
            'cod_munic',
            'cod_cnes',
            'dsc_endereco',
            'dsc_bairro',
            'dsc_cidade',
            'dsc_telefone',
            'dsc_estrut_fisic_ambiencia',
            'dsc_adap_defic_fisic_idosos',
            'dsc_equipamentos',
            'dsc_medicamentos',
            'co_cep',
            'latitude',
            'longitude',
            'distancia'
        )

    def get_distancia(self, obj):
        try:
            return '{:.3}'.format(obj.distance.km)
        except AttributeError:
            return

    def get_latitude(self, obj):
        return obj.vlr_latlon.y
    
    def get_longitude(self, obj):
        return obj.vlr_latlon.x

class UbsViewSet(viewsets.ModelViewSet):
    queryset = UBS.objects.all()
    serializer_class = UbsSerializer

    def get_queryset(self):
        lat = self.request.query_params.get('lat', None)
        lon = self.request.query_params.get('lon', None)

        if (lat is not None and lon is not None):
            point = Point(float(lon), float(lat), srid=4326)

            return UBS.objects.annotate(distance=Distance('vlr_latlon', point)).order_by('distance')

        return UBS.objects.all()
