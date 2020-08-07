from rest_framework import serializers
from .models import Users

class UsersSerializers(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = (
            'id',
            'user_lan_id',
            'project_id',
            'lob_id',
            'role_id',
            'first_name',
            'last_name',
            'creation_date',
            'access_expiry_date',
            'active'
        )
        extra_kwargs = {
            'user_lan_id': {
                'required': False,
                'allow_blank': True,
            },
            'project_id': {
                'required': False,
                'allow_blank': True,
            },
            'role_id': {
                'required': False,
                'allow_blank': True,
            },
            'first_name': {
                'required': False,
                'allow_blank': True,
            },
            'last_name': {
                'required': False,
                'allow_blank': True,
            },
            'access_expiry_date': {
                'required': False,
                'allow_blank': True,
            }
        }