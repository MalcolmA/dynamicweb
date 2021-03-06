# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2018-10-03 07:57
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import utils.mixins


class Migration(migrations.Migration):

    dependencies = [
        ('hosting', '0047_auto_20180821_1240'),
    ]

    operations = [
        migrations.CreateModel(
            name='GenericProduct',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_name', models.CharField(default='', max_length=128)),
                ('product_slug', models.SlugField(help_text='An optional html id for the Section. Required to set as target of a link on page', unique=True)),
                ('product_description', models.CharField(default='', max_length=500)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('product_price', models.DecimalField(decimal_places=2, max_digits=6)),
                ('product_vat', models.DecimalField(decimal_places=4, default=0, max_digits=6)),
                ('product_is_subscription', models.BooleanField(default=True)),
            ],
            bases=(utils.mixins.AssignPermissionsMixin, models.Model),
        ),
        migrations.AddField(
            model_name='hostingorder',
            name='generic_payment_description',
            field=models.CharField(max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='hostingorder',
            name='generic_product',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='hosting.GenericProduct'),
        ),
    ]
