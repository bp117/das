from django.db import models


class Users(models.Model):
    user_lan_id = models.CharField(max_length=20, default='')
    project_id = models.CharField(max_length=20, default='')
    lob_id = models.CharField(max_length=20)
    role_id = models.CharField(max_length=20, default='')
    first_name = models.CharField(max_length=100, default='')
    last_name = models.CharField(max_length=100, default='')
    creation_date = models.CharField(max_length=40)
    access_expiry_date = models.CharField(max_length=40, default='')
    active = models.CharField(max_length=10)

    def __str__(self):
        return self.first_name
