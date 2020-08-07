from django.db import models

class ProjectDetails(models.Model):
    lob_id = models.CharField(max_length=100, default="")
    workflow_id = models.CharField(max_length=100, default="")
    project_type_id = models.CharField(max_length=100, default="")
    annotation_id = models.CharField(max_length=100, default="")
    ds_id = models.CharField(max_length=100, default="")
    project_name = models.CharField(max_length=100)
    project_desc = models.CharField(max_length=400, default="")
    num_tasks = models.CharField(max_length=100, default="")
    complete_percent = models.CharField(max_length=100, default="")
    to_reassign = models.CharField(max_length=100, default="")
    workflow_roles = models.CharField(max_length=100, default="")
    annotators_list = models.CharField(max_length=9999999, default="")
    reviewers_list = models.CharField(max_length=9999999, default="")
    project_start_date = models.CharField(max_length=30, default="")
    project_recurrence_start_date = models.CharField(max_length=30, default="")
    project_recurrence_end_date = models.CharField(max_length=30, default="")
    project_end_date = models.CharField(max_length=30, default="")
    project_model_name = models.CharField(max_length=500, default="")
    project_status_id = models.CharField(max_length=100, default="")
    annotators_per_record = models.CharField(max_length=100, default="")

    def __str__(self):
        return self.project_name