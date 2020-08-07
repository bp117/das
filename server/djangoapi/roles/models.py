from django.db import models
class Roles(models.Model):
    role_id = models.CharField(max_length=40)
    role_desc = models.CharField(max_length=400, default='')
    lob_id = models.CharField(max_length=40)
    wfgroup_id = models.CharField(max_length=40)

    def __str__(self):
        return self.role_id