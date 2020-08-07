# Generated by Django 3.0.8 on 2020-08-05 17:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projectdetails', '0004_auto_20200805_0847'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projectdetails',
            name='annotation_id',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='projectdetails',
            name='annotators_per_record',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='projectdetails',
            name='ds_id',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='projectdetails',
            name='lob_id',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='projectdetails',
            name='project_desc',
            field=models.CharField(default='', max_length=400),
        ),
        migrations.AlterField(
            model_name='projectdetails',
            name='project_end_date',
            field=models.CharField(default='', max_length=30),
        ),
        migrations.AlterField(
            model_name='projectdetails',
            name='project_model_name',
            field=models.CharField(default='', max_length=500),
        ),
        migrations.AlterField(
            model_name='projectdetails',
            name='project_recurrence_end_date',
            field=models.CharField(default='', max_length=30),
        ),
        migrations.AlterField(
            model_name='projectdetails',
            name='project_recurrence_start_date',
            field=models.CharField(default='', max_length=30),
        ),
        migrations.AlterField(
            model_name='projectdetails',
            name='project_start_date',
            field=models.CharField(default='', max_length=30),
        ),
        migrations.AlterField(
            model_name='projectdetails',
            name='project_status_id',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='projectdetails',
            name='project_type_id',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='projectdetails',
            name='workflow_id',
            field=models.CharField(default='', max_length=100),
        ),
    ]
