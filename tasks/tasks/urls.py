#forma de definir las urls
from django.urls import path, include
from rest_framework import routers
from tasks import views
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

#schema
schema_view = get_schema_view(
    openapi.Info(
        title="API Documentation",
        default_version='v1',
        description="API documentation for my project",
        terms_of_service="https://www.example.com/terms/",
        contact=openapi.Contact(email="contact@example.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

#versionado de api
router = routers.DefaultRouter()
router.register(r'tasks', views.TaskView, 'tasks')

urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('api/v1/', include(router.urls)),
    path(r'swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path(r'redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('api/schema.json/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
]

#todo esto esta generando las rutas Get, Post, Put, Delete